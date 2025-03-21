import io
import logging
import socketserver
import libcamera
import cv2
import argparse
import threading
import numpy as np
import requests
import socket

from http import server
from threading import Condition

from picamera2 import Picamera2, MappedArray, Preview
from picamera2.encoders import JpegEncoder
from picamera2.outputs import FileOutput
from picamera2.devices import Hailo

PAGE = """\
<html>
<head>
<title>!!!!</title>
</head>
<body>
<h1>Raspberry PI AI Cam !</h1>
<h1>CPSC 491</h1>
<img src="stream.mjpg" width="640" height="480" />
</body>
</html>
"""

UDP_IP = "192.168.1.136"
UDP_PORT = 5005

# STREAMING STUFF
class StreamingOutput(io.BufferedIOBase):
    def __init__(self):
        self.frame = None
        self.condition = Condition()

    def write(self, buf):
        with self.condition:
            self.frame = buf
            self.condition.notify_all()

class StreamingHandler(server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(301)
            self.send_header('Location', '/index.html')
            self.end_headers()
        elif self.path == '/index.html':
            content = PAGE.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
        elif self.path == '/stream.mjpg':
            self.send_response(200)
            self.send_header('Age', 0)
            self.send_header('Cache-Control', 'no-cache, private')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Content-Type', 'multipart/x-mixed-replace; boundary=FRAME')
            self.end_headers()
            try:
                while True:
                    with stream.condition:
                        stream.condition.wait()
                        frame = stream.frame
                    self.wfile.write(b'--FRAME\r\n')
                    self.send_header('Content-Type', 'image/jpeg')
                    self.send_header('Content-Length', len(frame))
                    self.end_headers()
                    self.wfile.write(frame)
                    self.wfile.write(b'\r\n')
            except Exception as e:
                logging.warning(
                    'Removed streaming client %s: %s',
                    self.client_address, str(e))
        else:
            self.send_error(404)
            self.end_headers()

class StreamingServer(socketserver.ThreadingMixIn, server.HTTPServer):
    allow_reuse_address = True
    daemon_threads = True

def runServer():
    try:
        address = ('', 8000)
        server = StreamingServer(address, StreamingHandler)
        server.serve_forever()
    finally:
        picam2.stop_recording()

# AI PROCESSING STUFF
def extract_detections(hailo_output, w, h, class_names, threshold=0.5):
    """Extract detections from the HailoRT-postprocess output."""
    results = []
    for class_id, detections in enumerate(hailo_output):
        for detection in detections:
            score = detection[4]
            if score >= threshold:
                y0, x0, y1, x1 = detection[:4]
                bbox = (int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h))
                results.append([class_names[class_id], bbox, score])
    return results

def draw_objects(request):
    current_detections = detections
    if current_detections:
        with MappedArray(request, "main") as m:
            for class_name, bbox, score in current_detections:
                x0, y0, x1, y1 = bbox
                label = f"{class_name} %{int(score * 100)}"
                cv2.rectangle(m.array, (x0, y0), (x1, y1), (0, 255, 0, 0), 2)
                cv2.putText(m.array, label, (x0 + 5, y0 + 15),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0, 0), 1, cv2.LINE_AA)

# START HERE !
if __name__ == "__main__":
    # Parse command-line arguments.
    parser = argparse.ArgumentParser(description="Detection Example")
    parser.add_argument("-m", "--model", help="Path for the HEF model.",
                        default="/usr/share/hailo-models/yolov5s_personface_h8l.hef")
    parser.add_argument("-l", "--labels", default="coco.txt",
                        help="Path to a text file containing labels.")
    parser.add_argument("-s", "--score_thresh", type=float, default=0.5,
                        help="Score threshold, must be a float between 0 and 1.")
    args = parser.parse_args()
    
    # Get the Hailo model, the input size it wants, and the size of our preview stream.
    hailo = Hailo(args.model)
    model_h, model_w, _ = hailo.get_input_shape()
    video_w, video_h = 1280, 960
    
    # Load class names from the labels file
    class_names = open(args.labels, 'r', encoding="utf-8").read().splitlines() 

    # The list of detected objects to draw.
    detections = None

    # Configure and start Picamera2.
    picam2 = Picamera2()

    main = {'size': (video_w, video_h), 'format': 'XRGB8888'}
    lores = {'size': (model_w, model_h), 'format': 'RGB888'}
    controls = {'FrameRate': 30}
    config = picam2.create_preview_configuration(main, lores=lores, controls=controls)
    config["transform"] = libcamera.Transform(hflip=0, vflip=1)
    picam2.configure(config)

    #webServerThread = threading.Thread(target=runServer, daemon=True)
    #webServerThread.start()
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.connect((UDP_IP, UDP_PORT))
    streamFile = sock.makefile("wb")

    #picam2.start_preview(Preview.QTGL, x=0, y=0, width=video_w, height=video_h)
    #stream = StreamingOutput()
    picam2.start()
    picam2.start_recording(JpegEncoder(), FileOutput(streamFile))
    picam2.pre_callback = draw_objects

    # Process each low resolution camera frame.
    while True:
        frame = picam2.capture_array('lores')
        # Run inference on the preprocessed frame
        results = hailo.run(frame)
        # Extract detections from the inference results
        detections = extract_detections(results, video_w, video_h, class_names, args.score_thresh)