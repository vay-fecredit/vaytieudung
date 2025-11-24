// Lazy loading functions for eKYC libraries
async function loadTesseract() {
    if (window.Tesseract) return window.Tesseract;

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.0/dist/tesseract.min.js';
        script.onload = () => resolve(window.Tesseract);
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

async function loadFaceAPI() {
    if (window.faceapi) return window.faceapi;

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js';
        script.onload = () => resolve(window.faceapi);
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    class EkycApp {
        constructor() {
            this.config = {
                AUTO_CAPTURE_INTERVAL: 2000,
                MAX_CAPTURE_TIMEOUT: 30000,
                ERROR_MESSAGE_TIMEOUT: 5000,
                FACE_AUTO_CAPTURE_DELAY: 1500,
                NEXT_STEP_URL: 'pages/vi/step4.html',
                LIVENESS_CHECK_ENABLED: true,
                LIVENESS_EXPRESSION: 'neutral',
                LIVENESS_CONFIDENCE: 0.8,
                // AI OCR Configuration
                AI_OCR_ENABLED: false, // Set to true to enable AI OCR fallback
                AI_API_ENDPOINT: 'https://openrouter.ai/api/v1/chat/completions',
                AI_MODEL: 'openai/gpt-4o',
                AI_SYSTEM_PROMPT: 'Extract the full name and document number from the following OCR text. Return only a JSON object with "fullName" and "idNumber" fields. If information cannot be found, return empty strings.',
            };
            this.initLanguage();
            this.cacheDOMElements();
            this.initState();
            this.initEventListeners();
            this.initLibs();
            this.updateUIWithLanguage();
        }

        // Language Management
        initLanguage() {
            this.languages = {
                vi: {
                    stepper_step1: "Bước 1/4: Chọn loại giấy tờ",
                    docselect_title: "Xác thực giấy tờ",
                    docselect_subtitle: "Chọn một trong các phương thức xác thực dưới đây",
                    docselect_cccd: "Chứng minh thư, Thẻ căn cước",
                    docselect_passport: "Hộ chiếu",
                    docselect_driver: "Bằng lái xe",
                    docselect_qr: "Quét mã QR",
                    docselect_other: "Giấy tờ khác",
                    capture_button: "Chụp Ảnh",
                    back_button: "Quay lại",
                    retake_button: "Chụp lại",
                    upload_fallback_text: "Hoặc, bạn có thể tải ảnh lên từ thiết bị:",
                    upload_button: "Tải ảnh lên",
                    confirm_title: "Xác nhận thông tin",
                    confirm_subtitle: "Vui lòng kiểm tra kỹ hình ảnh và thông tin. Bạn có thể chụp lại nếu cần.",
                    confirm_front: "Mặt trước",
                    confirm_back: "Mặt sau",
                    confirm_face: "Chân dung",
                    info_id: "Số giấy tờ:",
                    info_name: "Họ và tên:",
                    confirm_button: "Hoàn tất xác thực",
                    success_title: "Xác thực thành công!",
                    success_subtitle: "Cảm ơn bạn đã hoàn tất quá trình xác thực eKYC. Thông tin của bạn đã được gửi đi an toàn.",
                    restart_button: "Thực hiện lại",
                },
                en: {
                    stepper_step1: "Step 1/4: Select document type",
                    docselect_title: "Document Verification",
                    docselect_subtitle: "Please select one of the verification methods below",
                    docselect_cccd: "ID Card",
                    docselect_passport: "Passport",
                    docselect_driver: "Driver's License",
                    docselect_qr: "Scan QR Code",
                    docselect_other: "Other Documents",
                    capture_button: "Capture",
                    back_button: "Back",
                    retake_button: "Retake",
                    upload_fallback_text: "Or, you can upload an image from your device:",
                    upload_button: "Upload Image",
                    confirm_title: "Confirm Information",
                    confirm_subtitle: "Please check the images and information carefully. You can retake if needed.",
                    confirm_front: "Front Side",
                    confirm_back: "Back Side",
                    confirm_face: "Portrait",
                    info_id: "Document No:",
                    info_name: "Full Name:",
                    confirm_button: "Complete Verification",
                    success_title: "Verification Successful!",
                    success_subtitle: "Thank you for completing the eKYC process. Your information has been sent securely.",
                    restart_button: "Start Over",
                }
            };
            this.currentLang = 'vi';
        }

        cacheDOMElements() {
            this.dom = {
                stepper: document.querySelector('#stepper'),
                views: {
                    docSelect: document.querySelector('#docSelectView'),
                    capture: document.querySelector('#captureView'),
                    confirm: document.querySelector('#confirmView'),
                    success: document.querySelector('#successView'),
                },
                captureView: {
                    title: document.querySelector('#captureTitle'),
                    subtitle: document.querySelector('#captureSubtitle'),
                    instruction: document.querySelector('#captureInstruction'),
                    cameraFrame: document.querySelector('#cameraFrame'),
                    cameraVideo: document.querySelector('#cameraVideo'),
                    cameraCanvas: document.querySelector('#cameraCanvas'),
                    idOverlay: document.querySelector('#idOverlay'),
                    faceOverlay: document.querySelector('#faceOverlay'),
                    btnCapture: document.querySelector('#btnCapture'),
                    btnBack: document.querySelector('#btnBack'),
                    errorMessage: document.querySelector('#errorMessage'),
                    uploadFallback: document.querySelector('#uploadFallback'),
                    btnUpload: document.querySelector('#btnUpload'),
                    imageUploadInput: document.querySelector('#imageUpload'),
                },
                confirmView: {
                    frontImg: document.querySelector('#confirmFrontImg'),
                    backImg: document.querySelector('#confirmBackImg'),
                    faceImg: document.querySelector('#confirmFaceImg'),
                    idNumber: document.querySelector('#infoIdNumber'),
                    fullName: document.querySelector('#infoFullName'),
                    btnConfirm: document.querySelector('#btnConfirm'),
                },
                modals: {
                    videoTutorial: document.querySelector('#videoTutorialModal'),
                    cccdGuide: document.querySelector('#cccdGuideModal'),
                    passportGuide: document.querySelector('#passportGuideModal'),
                    driverLicenseGuide: document.querySelector('#driverLicenseGuideModal'),
                    qrScanner: document.querySelector('#qrScannerModal'),
                    fullscreen: document.querySelector('#fullscreenModal'),
                },
                loading: {
                    overlay: document.querySelector('#loadingOverlay'),
                    text: document.querySelector('#loadingText'),
                    lottieContainer: document.querySelector('#lottieLoading'),
                },
                successViewElements: {
                    lottieContainer: document.querySelector('#lottieSuccess'),
                },
                qr: {
                    btnCancel: document.querySelector('#btnCancelQR'),
                    video: document.querySelector('#qrVideo'),
                    message: document.querySelector('#qrMessage'),
                },
                fullscreenImage: document.querySelector('#fullscreenImage'),
                btnRestart: document.querySelector('#btnRestart'),
                btnStartFaceCapture: document.querySelector('#btnStartFaceCapture'),
                btnLang: document.querySelector('#btnLang'),
            };

            if (this.dom.captureView.cameraCanvas) {
                this.dom.captureView.cameraCanvasContext = this.dom.captureView.cameraCanvas.getContext('2d', { willReadFrequently: true });
            }
        }

        initState() {
            this.state = {
                docType: null,
                captureStage: 'select',
                images: { front: null, back: null, face: null },
                ocrResult: { idNumber: '', fullName: '' },
                stream: null,
                qrStream: null,
                tesseractWorker: null,
                currentView: 'docSelect',
                lottieLoading: null,
                lottieSuccess: null,
                isAutoCapturing: false,
                autoCaptureTimeoutId: null,
                autoCaptureMaxTimeoutId: null,
                isLowEndDevice: window.innerWidth < 600 || navigator.hardwareConcurrency < 4,
                animationFrameId: null,
                qrAnimationID: null,
                faceDetectionInterval: null,
                aiApiKey: null, // Will be loaded from credentials or user input
            };
        }

        initEventListeners() {
            // Document selection
            document.querySelectorAll('#docSelectView .doc-option').forEach(option => {
                option.addEventListener('click', () => this.handleDocSelect(option.dataset.type));
            });

            // Modal proceed buttons
            document.querySelectorAll('.btn-proceed').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.currentTarget.closest('.modal-overlay').classList.add('hidden');
                    this.setupCaptureStage('front');
                });
            });

            // Capture controls
            if (this.dom.captureView.btnCapture) {
                this.dom.captureView.btnCapture.addEventListener('click', () => this.triggerCapture(false));
            }
            if (this.dom.captureView.btnBack) {
                this.dom.captureView.btnBack.addEventListener('click', () => this.handleBack());
            }
            if (this.dom.btnStartFaceCapture) {
                this.dom.btnStartFaceCapture.addEventListener('click', () => this.startFaceStage());
            }

            // Retake buttons
            document.querySelectorAll('#confirmView button[data-retake]').forEach(button => {
                button.addEventListener('click', e => this.retakeImage(e.currentTarget.dataset.retake));
            });

            // Confirm and restart
            if (this.dom.confirmView.btnConfirm) {
                this.dom.confirmView.btnConfirm.addEventListener('click', () => this.submitForm());
            }
            if (this.dom.btnRestart) {
                this.dom.btnRestart.addEventListener('click', () => this.resetProcess());
            }

            // QR Scanner
            if (this.dom.qr.btnCancel) {
                this.dom.qr.btnCancel.addEventListener('click', () => this.stopQRScanner());
            }

            // Fullscreen image view
            if (this.dom.confirmView.frontImg) {
                this.dom.confirmView.frontImg.addEventListener('click', (e) => this.showFullscreen(e.target.src));
            }
            if (this.dom.confirmView.backImg) {
                this.dom.confirmView.backImg.addEventListener('click', (e) => this.showFullscreen(e.target.src));
            }
            if (this.dom.confirmView.faceImg) {
                this.dom.confirmView.faceImg.addEventListener('click', (e) => this.showFullscreen(e.target.src));
            }

            // Image upload
            if (this.dom.captureView.btnUpload) {
                this.dom.captureView.btnUpload.addEventListener('click', () => this.dom.captureView.imageUploadInput.click());
            }
            if (this.dom.captureView.imageUploadInput) {
                this.dom.captureView.imageUploadInput.addEventListener('change', (e) => this.handleImageUpload(e));
            }

            // Language toggle
            if (this.dom.btnLang) {
                this.dom.btnLang.addEventListener('click', () => this.toggleLanguage());
            }
        }

        async initLibs() {
            this.showLoading(true, 'Đang tải tài nguyên...');

            // Initialize Lottie animations
            try {
                if (this.dom.loading.lottieContainer) {
                    this.state.lottieLoading = lottie.loadAnimation({
                        container: this.dom.loading.lottieContainer,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: 'https://assets2.lottiefiles.com/packages/lf20_p8bfn5to.json'
                    });
                }

                if (this.dom.successViewElements.lottieContainer) {
                    this.state.lottieSuccess = lottie.loadAnimation({
                        container: this.dom.successViewElements.lottieContainer,
                        renderer: 'svg',
                        loop: false,
                        autoplay: false,
                        path: 'https://assets1.lottiefiles.com/packages/lf20_xwmj0hsk.json'
                    });
                }
            } catch (error) {
                console.warn("Lottie animations failed to load:", error);
            }

            try {
                // Initialize Tesseract worker
                const faceApiModelPath = 'https://justadudewhohacks.github.io/face-api.js/models';

                const tesseractPromise = Tesseract.createWorker('vie', 1, {
                    workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.0/dist/worker.min.js',
                    langPath: 'https://tessdata.projectnaptha.com/4.0.0',
                    corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@5.1.0/tesseract-core.wasm.js',
                }).then(worker => {
                    this.state.tesseractWorker = worker;
                    console.log("Tesseract worker initialized.");
                }).catch(error => {
                    console.error("Tesseract initialization failed:", error);
                    this.logErrorToServer({ message: "Tesseract initialization failed", details: error.message });
                });

                // Initialize Face API
                const faceApiPromise = Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(faceApiModelPath),
                    faceapi.nets.faceLandmark68Net.loadFromUri(faceApiModelPath),
                    faceapi.nets.faceExpressionNet.loadFromUri(faceApiModelPath)
                ]).then(() => {
                    console.log("FaceAPI models loaded.");
                }).catch(error => {
                    console.error("FaceAPI initialization failed:", error);
                    this.logErrorToServer({ message: "FaceAPI initialization failed", details: error.message });
                });

                await Promise.all([tesseractPromise, faceApiPromise]);

                // Load AI API key if AI OCR is enabled
                if (this.config.AI_OCR_ENABLED) {
                    await this.loadAICredentials();
                }

            } catch (error) {
                console.error("Library initialization failed:", error);
                this.logErrorToServer({ message: "Library initialization failed", details: error.message });
                this.showError("Lỗi tải tài nguyên. Vui lòng kiểm tra kết nối mạng và thử lại.", this.dom.captureView.errorMessage, false);
            } finally {
                this.showLoading(false);
            }
        }

        async loadAICredentials() {
            try {
                // Try to load from credentials.json
                const response = await fetch('/credentials.json');
                if (response.ok) {
                    const credentials = await response.json();
                    this.state.aiApiKey = credentials.openrouter_api_key;
                }
            } catch (error) {
                console.log("Could not load credentials from file, will prompt user if needed");
            }
        }

        // Language Management Functions
        toggleLanguage() {
            this.currentLang = this.currentLang === 'vi' ? 'en' : 'vi';
            this.dom.btnLang.textContent = this.currentLang === 'vi' ? 'EN' : 'VI';
            this.updateUIWithLanguage();
        }

        updateUIWithLanguage() {
            const langData = this.languages[this.currentLang];
            document.querySelectorAll('[data-lang-key]').forEach(element => {
                const key = element.dataset.langKey;
                if (langData[key]) {
                    element.textContent = langData[key];
                }
            });
        }

        // View Management
        showView(viewName) {
            if (!this.dom.views[viewName] || this.state.currentView === viewName) return;
            Object.values(this.dom.views).forEach(v => v.classList.add('hidden'));
            this.dom.views[viewName].classList.remove('hidden');
            this.dom.views[viewName].classList.add('fade-in');
            this.state.currentView = viewName;
        }

        updateStepper(text) {
            if (this.dom.stepper) {
                this.dom.stepper.textContent = text;
            }
        }

        showLoading(show = true, text = 'Đang xử lý...') {
            if (this.dom.loading.text) {
                this.dom.loading.text.textContent = text;
            }
            if (this.dom.loading.overlay) {
                this.dom.loading.overlay.classList.toggle('hidden', !show);
            }
        }

        showError(message, targetElement = this.dom.captureView.errorMessage, autoHide = true) {
            if (targetElement) {
                targetElement.textContent = message || '';
                targetElement.classList.toggle('visible', !!message);
                if (message && autoHide) {
                    setTimeout(() => targetElement.classList.remove('visible'), this.config.ERROR_MESSAGE_TIMEOUT);
                }
            } else {
                console.error("showError: Target element is null. Message:", message);
            }
        }

        showFullscreen(src) {
            if (!src || src.includes('placehold.co')) return;
            if (this.dom.fullscreenImage && this.dom.modals.fullscreen) {
                this.dom.fullscreenImage.src = src;
                this.dom.modals.fullscreen.classList.remove('hidden');
            }
        }

        // Stream Management
        stopAllStreams() {
            if (this.state.stream) {
                this.state.stream.getTracks().forEach(track => track.stop());
                this.state.stream = null;
            }
            if (this.state.qrStream) {
                this.state.qrStream.getTracks().forEach(track => track.stop());
                this.state.qrStream = null;
            }
            if (this.dom.captureView.cameraVideo) this.dom.captureView.cameraVideo.srcObject = null;
            if (this.dom.qr.video) this.dom.qr.video.srcObject = null;

            this.stopAutoCapture();
            if (this.state.animationFrameId) {
                cancelAnimationFrame(this.state.animationFrameId);
                this.state.animationFrameId = null;
            }
            if (this.state.qrAnimationID) {
                cancelAnimationFrame(this.state.qrAnimationID);
                this.state.qrAnimationID = null;
            }
            if (this.state.faceDetectionInterval) {
                clearInterval(this.state.faceDetectionInterval);
                this.state.faceDetectionInterval = null;
            }
        }

        resetProcess() {
            this.stopAllStreams();
            this.initState();
            if (this.state.lottieSuccess) {
                this.state.lottieSuccess.stop();
            }
            this.setupCaptureStage('select');
        }

        // Document Selection and Navigation
        handleDocSelect(docType) {
            this.state.docType = docType;
            if (docType === 'qr') {
                this.updateStepper('Bước 2/2: Quét mã QR');
                this.startQRScanner();
                return;
            }
            const guideModals = {
                'cccd': this.dom.modals.cccdGuide,
                'other': this.dom.modals.cccdGuide,
                'passport': this.dom.modals.passportGuide,
                'driver': this.dom.modals.driverLicenseGuide,
            };
            if (guideModals[docType]) {
                guideModals[docType].classList.remove('hidden');
            }
        }

        handleBack() {
            const stage = this.state.captureStage;
            const prevStageMap = {
                'front': 'select',
                'back': 'front',
                'face': (this.state.docType === 'cccd' || this.state.docType === 'other') ? 'back' : 'front',
                'confirm': 'face',
            };
            const prevStage = prevStageMap[stage];
            if (prevStage) {
                this.setupCaptureStage(prevStage);
            }
        }

        async setupCaptureStage(stage) {
            this.state.captureStage = stage;
            this.showError(null);
            if (this.dom.captureView.uploadFallback) {
                this.dom.captureView.uploadFallback.classList.add('hidden');
            }

            const stageConfig = {
                'select': { step: "1/4", title: "Chọn loại giấy tờ" },
                'front': { step: "2/4", title: "Chụp mặt trước", subtitle: "Vui lòng đặt mặt trước của giấy tờ vào trong khung hình.", isFace: false, instruction: "Đang tìm kiếm giấy tờ..." },
                'back': { step: "2/4", title: "Chụp mặt sau", subtitle: "Vui lòng đặt mặt sau của giấy tờ vào trong khung hình.", isFace: false, instruction: "Đang tìm kiếm giấy tờ..." },
                'face': { step: "3/4", title: "Xác thực khuôn mặt", subtitle: "Vui lòng giữ khuôn mặt của bạn trong khung hình oval.", isFace: true, instruction: "Đưa khuôn mặt vào trong khung" },
                'confirm': { step: "4/4", title: "Xác nhận thông tin" },
                'success': { step: "4/4", title: "Hoàn thành" }
            };
            const config = stageConfig[stage];
            this.updateStepper(`Bước ${config.step}: ${config.title}`);

            this.stopAllStreams();

            if (stage === 'select') { this.showView('docSelect'); return; }
            if (stage === 'confirm') { this.showConfirmationScreen(); return; }
            if (stage === 'success') {
                this.showView('success');
                if (this.state.lottieSuccess) this.state.lottieSuccess.goToAndPlay(0);
                setTimeout(() => { window.location.href = this.config.NEXT_STEP_URL; }, 2000);
                return;
            }

            this.showView('capture');
            if (this.dom.captureView.title) this.dom.captureView.title.textContent = config.title;
            if (this.dom.captureView.subtitle) this.dom.captureView.subtitle.textContent = config.subtitle;
            if (this.dom.captureView.instruction) this.dom.captureView.instruction.textContent = config.instruction;

            if (this.dom.captureView.idOverlay) this.dom.captureView.idOverlay.classList.toggle('hidden', config.isFace);
            if (this.dom.captureView.faceOverlay) this.dom.captureView.faceOverlay.classList.toggle('hidden', !config.isFace);

            const cameraStarted = await this.startCamera(config.isFace, this.dom.captureView.cameraVideo);
            if (cameraStarted) {
                if (this.dom.captureView.btnCapture) this.dom.captureView.btnCapture.disabled = config.isFace;
                if (config.isFace) {
                    this.startAdvancedFaceDetection();
                } else {
                    this.state.simulationAttempts = 0;
                    this.state.isCardDetected = false;
                    this.drawVideoToCanvas();
                    this.autoCaptureLoop();
                }
            }
        }

        // Camera Functions
        async startCamera(isFrontFacing = false, videoElement) {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                this.showError("Trình duyệt không hỗ trợ camera. Vui lòng sử dụng trình duyệt hiện đại hơn.", this.dom.captureView.errorMessage, false);
                if (this.dom.captureView.uploadFallback) this.dom.captureView.uploadFallback.classList.remove('hidden');
                return false;
            }

            try {
                const widthConstraint = this.state.isLowEndDevice ? { ideal: 640 } : { min: 640, ideal: 1280, max: 1920 };
                const heightConstraint = this.state.isLowEndDevice ? { ideal: 480 } : { min: 480, ideal: 720, max: 1080 };

                const constraints = {
                    video: {
                        facingMode: isFrontFacing ? 'user' : 'environment',
                        width: widthConstraint,
                        height: heightConstraint
                    }
                };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                videoElement.srcObject = stream;
                await videoElement.play();
                this.state.stream = stream;

                videoElement.onloadedmetadata = () => {
                    if (this.dom.captureView.cameraCanvas) {
                        const canvas = this.dom.captureView.cameraCanvas;
                        canvas.width = videoElement.videoWidth;
                        canvas.height = videoElement.videoHeight;
                    }
                };
                return true;
            } catch (err) {
                console.error("Camera error:", err);
                this.logErrorToServer({ message: "Camera access failed", details: err.name });
                let message = "Không thể truy cập camera. Vui lòng kiểm tra quyền và thử lại.";
                if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                    message = "Quyền truy cập camera bị từ chối. Vui lòng cấp quyền trong cài đặt trình duyệt.";
                    this.showError(message, this.dom.captureView.errorMessage, false);
                    if (this.dom.captureView.btnBack) {
                        this.dom.captureView.btnBack.querySelector('span').textContent = "Thử lại";
                        this.dom.captureView.btnBack.onclick = () => location.reload();
                    }
                } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
                    message = "Không tìm thấy camera nào trên thiết bị của bạn.";
                    this.showError(message, this.dom.captureView.errorMessage, false);
                } else {
                    this.showError(message, this.dom.captureView.errorMessage, false);
                }
                if (this.dom.captureView.uploadFallback) this.dom.captureView.uploadFallback.classList.remove('hidden');
                return false;
            }
        }

        drawVideoToCanvas() {
            if (!this.state.stream || !this.state.stream.active) return;
            if (!this.dom.captureView.cameraCanvas || !this.dom.captureView.cameraVideo) return;

            const { cameraCanvas: canvas, cameraCanvasContext: context } = this.dom.captureView;
            const video = this.dom.captureView.cameraVideo;

            if (canvas.width > 0 && canvas.height > 0) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
            }

            this.state.animationFrameId = requestAnimationFrame(() => this.drawVideoToCanvas());
        }

        autoCaptureLoop() {
            if (!this.state.stream || !this.state.stream.active || this.state.isAutoCapturing) return;

            if (!this.state.autoCaptureMaxTimeoutId) {
                this.state.autoCaptureMaxTimeoutId = setTimeout(() => {
                    if (this.state.isAutoCapturing) return;
                    this.showError("Không thể tự động chụp. Vui lòng nhấn nút 'Chụp ảnh' để thử thủ công.", this.dom.captureView.errorMessage, true);
                    this.stopAutoCapture();
                    if (this.dom.captureView.btnCapture) this.dom.captureView.btnCapture.disabled = false;
                }, this.config.MAX_CAPTURE_TIMEOUT);
            }

            // Simulate card detection for demo purposes
            this.state.simulationAttempts = this.state.simulationAttempts === undefined ? 0 : this.state.simulationAttempts + 1;
            const isCardDetected = this.state.simulationAttempts > 3;
            const isValid = this.state.simulationAttempts > 6;
            const message = !isCardDetected ? "Đang tìm kiếm giấy tờ..." : (isValid ? "Sẵn sàng chụp! Giữ máy ổn định." : "Đã tìm thấy. Vui lòng giữ yên...");

            if (this.dom.captureView.cameraFrame) this.dom.captureView.cameraFrame.classList.toggle('ready-to-capture', isCardDetected && isValid);
            if (this.dom.captureView.instruction) this.dom.captureView.instruction.textContent = message;

            if (isCardDetected && isValid) {
                if (!this.state.autoCaptureTimeoutId) {
                    this.state.autoCaptureTimeoutId = setTimeout(() => this.triggerCapture(true), this.config.AUTO_CAPTURE_INTERVAL);
                }
            } else {
                this.stopAutoCapture(false);
                setTimeout(() => this.autoCaptureLoop(), 500);
