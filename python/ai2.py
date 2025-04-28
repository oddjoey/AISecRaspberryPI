#!/usr/bin/env python3

# Initialize Camera
#      ↓
# Load Face Detector and InsightFace models
#      ↓
# Capture a Frame
#      ↓
# Run Face Detection
#      ↓
# Get Bboxes
#      ↓
# Crop faces
#      ↓
# Preprocess crops
#      ↓
# Run Face Recognition
#      ↓
# Compare embeddings

import libcamera # type: ignore
import cv2 # type: ignore
import argparse
import numpy as np
import socket
import struct
from sklearn.metrics.pairwise import cosine_similarity # type: ignore

from picamera2 import MappedArray, Picamera2, Preview # type: ignore
from picamera2.encoders import MJPEGEncoder # type: ignore
from picamera2.outputs import Output # type: ignore
from picamera2.devices import Hailo # type: ignore

VIDEO_WIDTH = 1920
VIDEO_HEIGHT = 1080

SERVER_IP = "192.168.1.136"
SERVER_PORT = 5005

faces_detected = []

class SocketOutput(Output):
    def outputframe(self, frame, keyframe=True, timestamp=None, packet=None, audio=None):
        try:
            sock.sendall(struct.pack(">I", len(frame)))
            sock.sendall(frame)
        except Exception as e:
            print("Socket send failed:", e)

def extract_faces_from_tensors(data):
    faces_detected = []
    for class_id, detections in enumerate(data):
        for detection in detections:
            y0, x0, y1, x1 = detection[:4]
            bbox = (int(x0 * face_detector_input_res[0]), int(y0 * face_detector_input_res[1]),
                     int(x1 * face_detector_input_res[0]), int(y1 * face_detector_input_res[1]))
            score = detection[4]
            if score > 0.50 and class_id == 1:
                faces_detected.append([bbox, score])
    return faces_detected

def crop_faces_from_frame(frame, faces):
    cropped_faces = []
    for bbox, score in faces:
        cropped_faces.append(frame[bbox[1]:bbox[3], bbox[0]:bbox[2]])
    return cropped_faces

def pre_process_crops(cropped_faces):
    processed_faces = []
    for face in cropped_faces:
        if face is None or face.size == 0:
            continue  # Skip invalid or empty crops
        face_resized = cv2.resize(face, (face_recognizer_input_res[0], face_recognizer_input_res[1]))
        processed_faces.append(face_resized)
    return processed_faces

def draw_objects(request):
    current_detections = faces_detected
    if current_detections:
        with MappedArray(request, "main") as m:
            for bbox, score in current_detections:
                x0, y0, x1, y1 = bbox
                label = f" %{int(score * 100)}"
                cv2.rectangle(m.array, (x0, y0), (x1, y1), (0, 255, 0, 0), 2)
                cv2.putText(m.array, label, (x0 + 5, y0 + 15),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0, 0), 1, cv2.LINE_AA)
                
# START HERE !
if __name__ == "__main__":
    # models
    face_detector = Hailo("/usr/share/hailo-models/yolov5s_personface_h8l.hef")
    face_recognizer = Hailo("/home/pi/arcface_mobilefacenet.hef")

    # data about models
    face_detector_input_res = face_detector.get_input_shape()
    face_recognizer_input_res = face_recognizer.get_input_shape()

    # stream to server
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((SERVER_IP, SERVER_PORT))

    # Configure and start Picamera2.
    picam2 = Picamera2()

    main = {'size': (VIDEO_WIDTH, VIDEO_HEIGHT), 'format': 'XRGB8888'}
    lores = {'size': (face_detector_input_res[0], face_detector_input_res[1]), 'format': 'RGB888'}
    controls = {'FrameRate': 30}
    config = picam2.create_preview_configuration(main, lores=lores, controls=controls)
    picam2.configure(config)    

    picam2.start_preview(Preview.QTGL, x=0, y=0, width=VIDEO_WIDTH, height=VIDEO_HEIGHT)
    picam2.start()
    picam2.start_recording(MJPEGEncoder(), SocketOutput())
    #picam2.pre_callback = draw_objects

    joeys_embedding = np.load("faces/face0_emb.npy")

    while True:
        frame = picam2.capture_array("lores")
        face_detector_tensors = face_detector.run(frame)
        faces_detected = extract_faces_from_tensors(face_detector_tensors)
        cropped_faces = crop_faces_from_frame(frame, faces_detected)
        processed_faces = pre_process_crops(cropped_faces)
        for index, face in enumerate(processed_faces):
            face_embedding = face_recognizer.run(face)
            simularity = cosine_similarity([face_embedding], [joeys_embedding])
            print(f"[{index}] simularity: {simularity[0][0]}")
        