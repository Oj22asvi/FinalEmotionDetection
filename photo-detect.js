



// async function loadModels() {
//     await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
//     await faceapi.nets.faceExpressionNet.loadFromUri('/models');
//     await faceapi.nets.ageGenderNet.loadFromUri('/models');
//     console.log("Models loaded successfully.");
// }

// async function detectAttributes() {
//     const input = document.getElementById('imageUpload').files[0];
//     if (!input) {
//         alert("Please upload an image.");
//         return;
//     }

//     const img = await faceapi.bufferToImage(input);
//     img.id = 'uploadedImage';
    
//     const imageContainer = document.getElementById('imageContainer');
//     imageContainer.innerHTML = '';  // Clear previous content

//     // Append the image
//     imageContainer.appendChild(img);

//     const displaySize = { width: img.width, height: img.height };
//     const canvas = faceapi.createCanvasFromMedia(img);
//     imageContainer.append(canvas);

//     faceapi.matchDimensions(canvas, displaySize);

//     // Detect faces, emotions, age, and gender for all faces in the image
//     const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
//         .withFaceExpressions()
//         .withAgeAndGender();

//     if (detections.length === 0) {
//         alert("No faces detected. Try a different image.");
//         return;
//     }

//     const resizedDetections = faceapi.resizeResults(detections, displaySize);
//     const context = canvas.getContext('2d');
//     context.clearRect(0, 0, canvas.width, canvas.height);

//     // Draw bounding boxes and information for each detected face
//     faceapi.draw.drawDetections(canvas, resizedDetections);
//     faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

//     resizedDetections.forEach(detection => {
//         const { age, gender, genderProbability, expressions } = detection;
//         const box = detection.detection.box;

//         // Find the dominant emotion with the highest confidence
//         const dominantEmotion = Object.entries(expressions).reduce((max, current) => max[1] > current[1] ? max : current)[0];

//         // Format the display text with age, gender, and emotion
//         const infoText = [
//             `Age: ${Math.round(age)}`,
//             `Gender: ${gender} (${(genderProbability * 100).toFixed(1)}%)`,
//             `Emotion: ${dominantEmotion}`
//         ];

//         // Draw text for each face
//         const drawBox = new faceapi.draw.DrawTextField(infoText, box.bottomLeft);
//         drawBox.draw(canvas);
//     });
// }

// document.getElementById('imageUpload').addEventListener('change', detectAttributes);

// loadModels().catch(error => console.error("Error loading models:", error));


async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');
    await faceapi.nets.ageGenderNet.loadFromUri('/models');
    console.log("Models loaded successfully.");
}

async function detectAttributes() {
    const input = document.getElementById('imageUpload').files[0];
    if (!input) {
        alert("Please upload an image.");
        return;
    }

    const img = await faceapi.bufferToImage(input);
    img.id = 'uploadedImage';
    
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '';  // Clear previous content

    // Append the image
    imageContainer.appendChild(img);

    const displaySize = { width: img.width, height: img.height };
    const canvas = faceapi.createCanvasFromMedia(img);
    imageContainer.append(canvas);

    faceapi.matchDimensions(canvas, displaySize);

    // Detect faces, emotions, age, and gender for all faces in the image
    const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions()
        .withAgeAndGender();

    if (detections.length === 0) {
        alert("No faces detected. Try a different image.");
        return;
    }

    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bounding boxes and information for each detected face
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    let dominantEmotion = 'neutral'; // Default emotion
    resizedDetections.forEach(detection => {
        const { age, gender, genderProbability, expressions } = detection;

        // Find the dominant emotion with the highest confidence
        dominantEmotion = Object.entries(expressions).reduce((max, current) => max[1] > current[1] ? max : current)[0];

        const infoText = [
            `Age: ${Math.round(age)}`,
            `Gender: ${gender} (${(genderProbability * 100).toFixed(1)}%)`,
            `Emotion: ${dominantEmotion}`
        ];

        const box = detection.detection.box;
        const drawBox = new faceapi.draw.DrawTextField(infoText, box.bottomLeft);
        drawBox.draw(canvas);
    });

    // Change background color based on the dominant emotion
    changeBackgroundColor(dominantEmotion);
}

function changeBackgroundColor(emotion) {
    let color;
    switch (emotion) {
        case 'happy':
            color = '#FFEB3B'; // Yellow
            break;
        case 'sad':
            color = '#2196F3'; // Blue
            break;
        case 'angry':
            color = '#F44336'; // Red
            break;
        case 'neutral':
            color = '#9E9E9E'; // Gray
            break;
        default:
            color = '#FFFFFF'; // Default white
    }
    document.body.style.backgroundColor = color;
}

document.getElementById('imageUpload').addEventListener('change', detectAttributes);

loadModels().catch(error => console.error("Error loading models:", error));




