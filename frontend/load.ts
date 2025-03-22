import * as blazeface from '@tensorflow-models/blazeface';
import * as tf from '@tensorflow/tfjs';

let faceModel: blazeface.BlazeFaceModel;
let genderModel: tf.LayersModel;// grt from outside resource

let video = document.getElementById("webcam")! as HTMLVideoElement;
let ctx = canvas.getContext("2d")!;

async function loadModels() {
    console.log("Loading models...");
    faceModel = await blazeface.load();

    genderModel = await tf.loadLayersModel('https://raw.githubusercontent.com/Tony607/Real_time_Gender_Recognition/master/model.json');

    console.log("Models loaded.");
}

function Videore() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    video.addEventListener('loadeddata', predictLive);
}

function information() {
 
    const predictions = await faceModel.estimateFaces(video, false);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    if (predictions.length > 0) {
        for (const pred of predictions) {
            const x = Math.floor(pred.topLeft[0]);
            const y = Math.floor(pred.topLeft[1]);
            const width = Math.floor(pred.bottomRight[0] - x);
            const height = Math.floor(pred.bottomRight[1] - y);

            ctx.strokeStyle = "#00FF03";
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, width, height);
            const face = tf.browser.fromPixels(video)
                .slice([y, x, 0], [height, width, 3])
                .resizeNearestNeighbor([64, 64])
                .toFloat()
                .div(tf.scalar(255))
                .expandDims(0);

            const prediction = await genderModel.predict(face).data();
            const gender = prediction[0] > 0.5 ? "Male" : "Female";

            ctx.fillStyle = "#00FF00";
            ctx.fillText(gender, x, y - 5);

            face.dispose();
        }
    }

    requestAnimationFrame(predictLive);
}

// Classify uploaded image
async function classifyImage() {
    const img = document.getElementById("preview")! as HTMLImageElement;

    if (!faceModel || !genderModel) {
        document.getElementById("result")!.innerText = "Model is loading...";
        return;
    }

    const tensor = tf.browser.fromPixels(img)
        .resizeNearestNeighbor([128, 128])
        .toFloat()
        .expandDims(0);

    const predictions = await faceModel.estimateFaces(tensor, false);

    if (predictions.length > 0) {
        const x = Math.floor(predictions[0].topLeft[0]);
        const y = Math.floor(predictions[0].topLeft[1]);
        const width = Math.floor(predictions[0].bottomRight[0] - x);
        const height = Math.floor(predictions[0].bottomRight[1] - y);

        const faceTensor = tf.browser.fromPixels(img)
            .slice([y, x, 0], [height, width, 3])
            .resizeNearestNeighbor([64, 64])
            .toFloat()
            .div(tf.scalar(255))
            .expandDims(0);

        const genderPrediction = await genderModel.predict(faceTensor).data();
        const gender = genderPrediction[0] > 0.5 ? "Male" : "Female";
        document.getElementById("result")!.innerText = `Prediction: ${gender}`;

        faceTensor.dispose();
    } else {
        document.getElementById("result")!.innerText = "No face detected.";
    }

    tensor.dispose();
}

// Handle file upload
document.getElementById("fileInput")!.addEventListener("change", (event) => {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.getElementById("preview")! as HTMLImageElement;
            img.src = e.target!.result as string;
            img.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

// Load models on startup
loadModels();
