import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, doc } from "firebase/firestore";

const db = getFirestore();
const storage = getStorage();


// Encrypt footage
const { encryptedBlob: encryptedVideo, iv: videoIV } = await encryptFile(file, aesKey);
const videoRef = ref(storage, `footage/${file.name}`);
await uploadBytes(videoRef, encryptedVideo);
const videoUrl = await getDownloadURL(videoRef);

// Encrypt face profile image
const faceImageInput = document.getElementById("faceUpload") as HTMLInputElement | null;

if (!faceImageInput || !faceImageInput.files || faceImageInput.files.length === 0) {
  console.error("No image selected for upload");
return;
}

const faceImage = faceImageInput.files[0];

const { encryptedBlob: encryptedImage, iv: imageIV } = await encryptFile(faceImage, aesKey);
const profileRef = ref(storage, `profiles/${faceImage.name}`);
await uploadBytes(profileRef, encryptedImage);
const profileUrl = await getDownloadURL(profileRef);

// Encrypt activity log text fields
const { ciphertext: encMessage, iv: msgIV } = await encryptText("Unknown person detected", aesKey);
const { ciphertext: encCamera, iv: camIV } = await encryptText("front-door", aesKey);

// Store profile document
const profileDoc = await addDoc(collection(db, "profiles"), {
  name: "face profile",
  photoUrl: profileUrl,
  createdAt: Date.now(),
  iv: imageIV
});

// Store footage document
const footageDoc = await addDoc(collection(db, "footage"), {
  fileName: file.name,
  fileUrl: videoUrl,
  type: "video",
  timestamp: Date.now(),
  iv: videoIV
});

// Store encrypted activity log
await addDoc(collection(db, "activityLogs"), {
  timestamp: Date.now(),
  type: "facedetection",
  message: encMessage,
  messageIV: msgIV,
  camera: encCamera,
  cameraIV: camIV,
  footageRef: footageDoc.id,
  profileRef: profileDoc.id
});


function encryptFile(faceImage: any, aesKey: any): { encryptedBlob: any; iv: any; } | PromiseLike<{ encryptedBlob: any; iv: any; }> {
    throw new Error("Function not implemented.");
}
