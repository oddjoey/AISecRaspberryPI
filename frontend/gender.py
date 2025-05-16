# Based on resources from:
# https://github.com/smahesh29/Gender-and-Age-Detection
# Includes use of 'detect.py' by Mahesh Sawant, licensed under the MIT License.
# Assistance and guidance provided by ChatGPT.
import io
import cv2  # type: ignore
import time
import threading
import numpy as np # type: ignore
from http import server
from picamera2 import Picamera2  #type: ignore
from picamera2.encoders import JpegEncoder   #type: ignore
from picamera2.outputs import FileOutput  # type: ignore

# === Load DNN Models ===
faceNet = cv2.dnn.readNet("opencv_face_detector_uint8.pb", "opencv_face_detector.pbtxt")
ageNet = cv2.dnn.readNet("age_net.caffemodel", "age_deploy.prototxt")
genderNet = cv2.dnn.readNet("gender_net.caffemodel", "gender_deploy.prototxt")

MODEL_MEAN_VALUES = (78.4263377603, 87.7689143744, 114.895847746)
ageList = ['(0-2)', '(4-6)', '(8-12)', '(15-20)', '(25-32)', '(38-43)', '(48-53)', '(60-100)']
genderList = ['Male', 'Female']

# === Global Frame Lock ===
output_frame = None
frame_lock = threading.Lock()

# === Face Detection Helper ===
def highlightFace(net, frame, conf_threshold=0.7):
    frameHeight, frameWidth = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300), [104, 117, 123], True, False)
    net.setInput(blob)
    detections = net.forward()
    faceBoxes = []
    for i in range(detections.shape[2]):
        confidence = detections[0, 0, i, 2]
        if confidence > conf_threshold:
            x1 = int(detections[0, 0, i, 3] * frameWidth)
            y1 = int(detections[0, 0, i, 4] * frameHeight)
            x2 = int(detections[0, 0, i, 5] * frameWidth)
            y2 = int(detections[0, 0, i, 6] * frameHeight)
            faceBoxes.append([x1, y1, x2, y2])
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
    return frame, faceBoxes

# === Image Capture Thread ===
def capture_thread():
    global output_frame
    picam2 = Picamera2()
    picam2.configure(picam2.create_preview_configuration(main={"format": 'BGR888', "size": (640, 480)}))
    picam2.start()

    while True:
        frame = picam2.capture_array()
        resultImg, faceBoxes = highlightFace(faceNet, frame)

        for faceBox in faceBoxes:
            face = frame[max(0, faceBox[1]-20):min(faceBox[3]+20, frame.shape[0]-1),
                         max(0, faceBox[0]-20):min(faceBox[2]+20, frame.shape[1]-1)]

            blob = cv2.dnn.blobFromImage(face, 1.0, (227, 227), MODEL_MEAN_VALUES, swapRB=False)

            genderNet.setInput(blob)
            gender = genderList[genderNet.forward()[0].argmax()]

            ageNet.setInput(blob)
            age = ageList[ageNet.forward()[0].argmax()]

            label = f"{gender}, {age}"
            cv2.putText(resultImg, label, (faceBox[0], faceBox[1]-10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 0), 2)

        with frame_lock:
            _, jpeg = cv2.imencode('.jpg', resultImg)
            output_frame = jpeg.tobytes()

# === HTTP Server for MJPEG Stream ===
PAGE = """\
<html>
<head><title>Live Age & Gender Detection</title></head>
<body>
<h1>Live Stream</h1>
<img src="stream.mjpg" width="640" height="480" />
</body>
</html>
"""

class StreamingHandler(server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            content = PAGE.encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self.send_header('Content-Length', len(content))
            self.end_headers()
            self.wfile.write(content)
        elif self.path == '/stream.mjpg':
            self.send_response(200)
            self.send_header('Age-Gender Stream', 'stream')
            self.send_header('Content-Type', 'multipart/x-mixed-replace; boundary=frame')
            self.end_headers()
            while True:
                with frame_lock:
                    if output_frame is None:
                        continue
                    self.wfile.write(b'--frame\r\n')
                    self.send_header('Content-Type', 'image/jpeg')
                    self.send_header('Content-Length', str(len(output_frame)))
                    self.end_headers()
                    self.wfile.write(output_frame)
                    self.wfile.write(b'\r\n')
        else:
            self.send_error(404)
            self.end_headers()

def start_server():
    address = ('', 8000)
    server_instance = server.HTTPServer(address, StreamingHandler)
    print("Web server running at http://<pi-ip>:8000/")
    server_instance.serve_forever()

# === Start Threads ===
threading.Thread(target=capture_thread, daemon=True).start()
start_server()
