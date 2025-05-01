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

import cv2 # type: ignore
import numpy as np
import socket
import struct
import websockets # type: ignore
import asyncio
import os

from sklearn.metrics.pairwise import cosine_similarity # type: ignore

from picamera2 import MappedArray, Picamera2, Preview # type: ignore
from picamera2.encoders import MJPEGEncoder # type: ignore
from picamera2.outputs import Output # type: ignore
from picamera2.devices import Hailo # type: ignore

VIDEO_OUTPUT_WIDTH = 1920
VIDEO_OUTPUT_HEIGHT = 1080

WEBSERVER_IP = "192.168.1.136"
WEBSERVER_PORT = 5005

# score needed to accept a face
FACE_SCORE = 0.5
# score needed to accept simularity between two faces
SIMULARITY_SCORE = 0.35

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

### models ###
face_detector = Hailo("/usr/share/hailo-models/yolov5s_personface_h8l.hef")
face_recognizer = Hailo("/home/pi/arcface_mobilefacenet.hef")

### data about models ###
face_detector_input_res = face_detector.get_input_shape()
face_recognizer_input_res = face_recognizer.get_input_shape()

processed_faces = []
known_face_embeddings = []

### AI FUNCTIONALITY ###
def extract_bboxes_from_tensors(tensors):
    faces_bboxes = []
    if tensors and face_detector_input_res:
        for class_id, detections in enumerate(tensors):
            for detection in detections:
                y0, x0, y1, x1 = detection[:4]
                bbox = (int(x0 * face_detector_input_res[0]), int(y0 * face_detector_input_res[1]),
                        int(x1 * face_detector_input_res[0]), int(y1 * face_detector_input_res[1]))
                score = detection[4]
                if score > FACE_SCORE and class_id == 1:
                    faces_bboxes.append(bbox)
    return faces_bboxes

def crop_faces_from_frame(frame, faces):
    cropped_faces = []
    for bbox in faces:
        cropped_faces.append(frame[bbox[1]:bbox[3], bbox[0]:bbox[2]])
    return cropped_faces

def resize_crops(cropped_faces):
    processed_faces = []
    if face_recognizer_input_res:
        for face in cropped_faces:
            if face is None or face.size == 0:
                continue  # Skip invalid or empty crops
            face_resized = cv2.resize(face, (face_recognizer_input_res[0], face_recognizer_input_res[1]))
            processed_faces.append(face_resized)
    return processed_faces

def process_faces(faces, faces_data):
    processed_faces_data = []
    if face_recognizer:
        for i, face in enumerate(faces):
            face_embedding = face_recognizer.run(face)
            bbox = faces_data[i]
            highest_simularity = 0
            matched_name = None
            for name, known_face_embedding in known_face_embeddings:
                simularity = cosine_similarity([face_embedding], [known_face_embedding])[0][0]
                if simularity > highest_simularity:
                    highest_simularity = simularity
                    matched_name = name
            processed_faces_data.append([bbox, highest_simularity, matched_name])
    return processed_faces_data

def draw_objects(request):
    global processed_faces
    if processed_faces and face_detector_input_res:
        with MappedArray(request, "main") as m:
            for bbox, simularity, name in processed_faces:
                x0, y0, x1, y1 = bbox
                x0 = int( x0 / face_detector_input_res[0] * VIDEO_OUTPUT_WIDTH )
                x1 = int( x1 / face_detector_input_res[0] * VIDEO_OUTPUT_WIDTH )
                y0 = int( y0 / face_detector_input_res[1] * VIDEO_OUTPUT_HEIGHT )
                y1 = int( y1 / face_detector_input_res[1] * VIDEO_OUTPUT_HEIGHT )
                simularityLabel = f"% {int(simularity * 100)}"
                nameLabel = name if simularity > SIMULARITY_SCORE else "Unknown"
                rect_color = (0, 255, 0, 255) if simularity > SIMULARITY_SCORE else (0, 0, 255, 255)
                cv2.rectangle(m.array, (x0, y0), (x1, y1), rect_color, 3)
                cv2.putText(m.array, simularityLabel, (x1 + 20, y0 + 20), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0, 255), 3, cv2.LINE_AA)
                cv2.putText(m.array, nameLabel, (x1 + 20, y0 + 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255, 255), 3, cv2.LINE_AA)
         
async def ai_task():
    global processed_faces, known_face_embeddings

    # stream to server
    sock.connect((WEBSERVER_IP, WEBSERVER_PORT))

    # Configure and start Picamera2.
    picam2 = Picamera2()

    main = {'size': (VIDEO_OUTPUT_WIDTH, VIDEO_OUTPUT_HEIGHT), 'format': 'XRGB8888'}
    lores = {'size': (face_detector_input_res[0], face_detector_input_res[1]), 'format': 'RGB888'}
    controls = {'FrameRate': 30}
    config = picam2.create_preview_configuration(main, lores=lores, controls=controls)
    picam2.configure(config)

    #picam2.start_preview(Preview.QTGL, x=0, y=0, width=VIDEO_OUTPUT_WIDTH, height=VIDEO_OUTPUT_HEIGHT)
    picam2.start()
    picam2.start_recording(MJPEGEncoder(), SocketOutput())
    picam2.pre_callback = draw_objects

    load_saved_embeddings()

    while True:
            frame = picam2.capture_array("lores")
            face_detector_tensors = face_detector.run(frame)
            faces_bboxes = extract_bboxes_from_tensors(face_detector_tensors)
            cropped_faces = crop_faces_from_frame(frame, faces_bboxes)
            resized_faces = resize_crops(cropped_faces)
            processed_faces = process_faces(resized_faces, faces_bboxes)
            await asyncio.sleep(0)

### SAVE/UPDATE/LOAD IMG DATA USING AI ###
def process_and_save_img(img_name):
    if face_recognizer and face_detector and face_detector_input_res:
        frame = cv2.resize(cv2.imread("faces/imgs/" + img_name), (face_detector_input_res[0], face_detector_input_res[1]))
        face_detector_tensors = face_detector.run(frame)
        faces_bboxes = extract_bboxes_from_tensors(face_detector_tensors)
        if len(faces_bboxes) == 0:
            print("No faces detected, use another image.")
            return
        elif len(faces_bboxes) > 1:
            print("More than one face detected, use another image or try again.")
            return
        cropped_faces = crop_faces_from_frame(frame, faces_bboxes)
        resized_faces = resize_crops(cropped_faces)
        face_embedding = face_recognizer.run(resized_faces[0])
        name = img_name.split(".")[0]
        np.save(f"faces/data/{name}_emb.npy", face_embedding)
    
def update_saved_embeddings():
    img_files = os.listdir("faces/imgs")
    data_files = os.listdir("faces/data")
    img_files_len = len(img_files)
    data_files_len = len(data_files)

    if img_files_len > data_files_len:
        for img_file in img_files:
            img_name = img_file.split("_")[0]
            data_found = False
            for data_file in data_files:
                data_name = data_file.split("_")[0]
                if img_name == data_name:
                    data_found = True
            if data_found == False:
                print(f"img: {img_name} does not contain data, saving {img_name}'s embedding to faces/")
                process_and_save_img(img_file)
    elif img_files_len < data_files_len:
        print("more data compared to imgs, continuing... but something could be wrong.")
    else:
        print("all imgs have associated data, continuing!")

def load_saved_embeddings():
    known_face_embeddings.clear()
    data_files = os.listdir("faces/data")
    for data_file in data_files:
        name = data_file.split("_")[0]
        data = np.load("faces/data/" + data_file)
        known_face_embeddings.append((name, data))

### WEB COMMUNICATION ###
class SocketOutput(Output):
    def outputframe(self, frame, keyframe=True, timestamp=None, packet=None, audio=None):
        try:
            if sock:
                sock.sendall(struct.pack(">I", len(frame)))
                sock.sendall(frame)
        except Exception as e:
            print("Socket send failed:", e)
            
async def handle_connection(websocket):
    data = await websocket.recv()
    # Read the first 4 bytes as uint32 for text length
    text_length = struct.unpack("I", data[:4])[0]

    text = data[4:4 + text_length].decode("utf-8")
    image_data = data[4 + text_length:]

    with open("faces/imgs/" + text, "wb") as f:
        f.write(image_data)
    
    process_and_save_img(text)
    load_saved_embeddings()

async def websocket_server():
    async with websockets.serve(handle_connection, "0.0.0.0", 8765, max_size=None):
        await asyncio.Future()

### SPLIT OUR TASKS TO RUN CONCURENTLY ###
async def split_tasks():
    await asyncio.gather(ai_task(), websocket_server())

### START HERE ! ###
if __name__ == "__main__":
    asyncio.run(split_tasks())