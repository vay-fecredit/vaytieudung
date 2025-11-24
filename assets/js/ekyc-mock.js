const video = document.getElementById('video');
const startBtn = document.getElementById('startBtn');
const canvas = document.getElementById('canvas');

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => {
      // Camera error occurred
    });
}

let referenceDescriptor = null;

startBtn.onclick = async () => {
  const detections = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!detections) {
    showError("Không phát hiện khuôn mặt");
    return;
  }

  if (!referenceDescriptor) {
    referenceDescriptor = detections.descriptor;
    alert("📸 Khuôn mặt mẫu đã được lưu. Vui lòng xác thực lại để so khớp.");
    return;
  }

  const distance = faceapi.euclideanDistance(referenceDescriptor, detections.descriptor);

  if (distance < 0.5) {
    showSuccess();
  } else {
    showError("Không khớp khuôn mặt");
  }
};

function showSuccess() {
  document.getElementById('success-message').style.display = 'block';
  setTimeout(() => {
    window.location.href = "pages/vi/step4.html";
  }, 2000);
}

function showError(msg) {
  const err = document.getElementById('error-message');
  err.textContent = "❌ " + msg;
  err.style.display = 'block';
}
