(async () => {
  // Thư mục chứa các model
  const MODEL_URL = './models';

  // Load các mô hình face-api.js
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
  ]);

  const video = document.getElementById('video');
  const statusEl = document.getElementById('status');
  const retryBtn = document.getElementById('btn-retry');

  // Mở camera
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;
    statusEl.textContent = 'Camera sẵn sàng. Vui lòng giữ mặt trước camera.';
  } catch (err) {
    statusEl.textContent = '❌ Không thể mở camera.';
    // Error opening camera
    return;
  }

  // Bước 1: Chụp mẫu lần đầu làm reference
  let referenceDescriptor = null;
  statusEl.textContent = '📸 Vui lòng nhìn thẳng vào camera để lấy mẫu.';
  await new Promise(res => setTimeout(res, 2000));
  
  // Nhận diện và lưu descriptor
  const refDetection = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!refDetection) {
    statusEl.textContent = '❌ Không phát hiện khuôn mặt mẫu.';
    retryBtn.style.display = 'inline-block';
    return;
  }

  referenceDescriptor = refDetection.descriptor;
  statusEl.textContent = '✔️ Mẫu đã được lưu. Chuẩn bị xác thực…';

  // Bước 2: So sánh với lần chụp tiếp theo
  await new Promise(res => setTimeout(res, 1500));
  statusEl.textContent = '🤖 Vui lòng đưa mặt vào camera lần 2 để xác thực.';

  const queryDetection = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!queryDetection) {
    statusEl.textContent = '❌ Không phát hiện khuôn mặt.';
    retryBtn.style.display = 'inline-block';
    return;
  }

  const distance = faceapi.euclideanDistance(referenceDescriptor, queryDetection.descriptor);
  const threshold = 0.6;

  if (distance < threshold) {
    statusEl.textContent = `✅ Xác thực thành công! (distance=${distance.toFixed(3)})`;
    setTimeout(() => window.location.href = '../pages/vi/step4.html', 2000);
  } else {
    statusEl.textContent = `❌ Xác thực thất bại (distance=${distance.toFixed(3)}).`;
    retryBtn.style.display = 'inline-block';
  }

  retryBtn.onclick = () => location.reload();
})();
