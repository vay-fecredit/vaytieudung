/**
 * eKYC Face Detection Enhancement
 * Implementation của startAdvancedFaceDetection() và các utilities liên quan
 * Version: 1.0.0
 * Date: 2025-11-10
 * 
 * File này cần được include vào ekyc-app.js hoặc sử dụng như extension
 */

// Load config
let ekycConfig = null;
fetch('/lib/ekyc-config.json')
  .then(res => res.json())
  .then(config => {
    ekycConfig = config.ekyc;
    // eKYC config loaded successfully
  })
  .catch(err => {
    // Failed to load eKYC config, using fallback
    // Fallback config
    ekycConfig = {
      face_detection: {
        roll_soft_threshold: 10,
        roll_hard_threshold: 15,
        pitch_threshold: 20,
        yaw_threshold: 20,
        confidence_threshold: 0.7,
        smoothing_frames: 5,
        detection_interval_ms: 300,
        auto_capture_delay_ms: 1500
      },
      retry_behavior: {
        max_attempts_before_report: 3,
        show_help_after_attempts: 2,
        retry_button_always_visible: true
      },
      ui_features: {
        show_angle_overlay: true,
        show_tilt_meter: true,
        show_angle_value: false,
        show_face_guide_box: true,
        enable_realtime_hints: true,
        enable_error_reporting: true
      }
    };
  });

/**
 * Advanced Face Detection Implementation
 * Thêm vào EkycApp class
 */
const FaceDetectionMixin = {
  
  /**
   * Initialize face detection với overlay
   */
  async startAdvancedFaceDetection() {
    // Starting advanced face detection
    
    if (!window.faceapi) {
      // Error: face-api.js not loaded
      this.showError('Không thể tải thư viện nhận diện khuôn mặt.', this.dom.captureView.errorMessage, false);
      return;
    }

    // Initialize overlay if enabled
    if (ekycConfig && ekycConfig.ui_features.show_angle_overlay) {
      this.initFaceOverlay();
    }

    // Initialize smoother
    if (!this.rollSmoother) {
      const smoothingFrames = ekycConfig?.face_detection?.smoothing_frames || 5;
      this.rollSmoother = new window.FaceAngleUtils.RollSmoother(smoothingFrames);
    }

    // Reset state
    this.faceAttemptCount = 0;
    this.faceDetectionActive = true;
    this.lastDetectionTime = 0;

    // Start detection loop
    this.runFaceDetectionLoop();
  },

  /**
   * Initialize face overlay UI
   */
  initFaceOverlay() {
    // Kiểm tra xem overlay container đã có chưa
    let overlayContainer = document.getElementById('face-overlay-container');
    
    if (!overlayContainer) {
      // Tạo container mới
      overlayContainer = document.createElement('div');
      overlayContainer.id = 'face-overlay-container';
      overlayContainer.style.position = 'absolute';
      overlayContainer.style.top = '0';
      overlayContainer.style.left = '0';
      overlayContainer.style.width = '100%';
      overlayContainer.style.height = '100%';
      overlayContainer.style.pointerEvents = 'none';
      overlayContainer.style.zIndex = '100';
      
      // Thêm vào camera frame
      const cameraFrame = this.dom.captureView.cameraFrame;
      if (cameraFrame) {
        cameraFrame.style.position = 'relative';
        cameraFrame.appendChild(overlayContainer);
      }
    }

    // Initialize EKYCOverlay
    if (window.EKYCOverlay && ekycConfig) {
      this.faceOverlay = new window.EKYCOverlay('face-overlay-container', ekycConfig.face_detection);
      
      // Set canvas size to match video
      const video = this.dom.captureView.cameraVideo;
      if (video && video.videoWidth && video.videoHeight) {
        this.faceOverlay.setCanvasSize(video.videoWidth, video.videoHeight);
      }

      // Show/hide features based on config
      this.faceOverlay.toggleTiltMeter(ekycConfig.ui_features.show_tilt_meter);
      this.faceOverlay.toggleFaceGuide(ekycConfig.ui_features.show_face_guide_box);
      this.faceOverlay.toggleAngleIndicators(ekycConfig.ui_features.show_angle_value);
    }
  },

  /**
   * Main face detection loop
   */
  async runFaceDetectionLoop() {
    if (!this.faceDetectionActive) return;

    const now = Date.now();
    const detectionInterval = ekycConfig?.face_detection?.detection_interval_ms || 300;

    // Throttle detection
    if (now - this.lastDetectionTime < detectionInterval) {
      requestAnimationFrame(() => this.runFaceDetectionLoop());
      return;
    }

    this.lastDetectionTime = now;

    try {
      const video = this.dom.captureView.cameraVideo;
      if (!video || video.paused || video.ended) {
        requestAnimationFrame(() => this.runFaceDetectionLoop());
        return;
      }

      // Detect face with landmarks
      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (detection) {
        this.processFaceDetection(detection);
      } else {
        this.handleNoFaceDetected();
      }

    } catch (error) {
      // Face detection error occurred
    }

    // Continue loop
    if (this.faceDetectionActive) {
      requestAnimationFrame(() => this.runFaceDetectionLoop());
    }
  },

  /**
   * Process face detection result
   */
  processFaceDetection(detection) {
    const config = ekycConfig?.face_detection || {};
    const landmarks = detection.landmarks;
    const confidence = detection.detection._score;

    // Compute angles
    const leftEye = landmarks.getLeftEye()[0];
    const rightEye = landmarks.getRightEye()[0];
    
    const rawRoll = window.FaceAngleUtils.computeRollDegrees(leftEye, rightEye);
    const roll = this.rollSmoother ? this.rollSmoother.push(rawRoll) : rawRoll;
    const pitch = window.FaceAngleUtils.computePitchDegrees(landmarks);
    const yaw = window.FaceAngleUtils.computeYawDegrees(landmarks);

    // Update overlay
    if (this.faceOverlay) {
      this.faceOverlay.updateTiltMeter(roll);
      this.faceOverlay.updateAngleIndicators(roll, pitch, yaw);
      this.faceOverlay.drawFaceBox(detection);
    }

    // Validate pose
    const validation = window.FaceAngleUtils.validateFacePose(
      roll, pitch, yaw, confidence, config
    );

    // Update hint message
    if (this.faceOverlay && ekycConfig?.ui_features?.enable_realtime_hints) {
      if (validation.passed) {
        const message = window.FaceAngleUtils.getTiltGuidanceMessage(roll, pitch, yaw, config);
        this.faceOverlay.updateHint(message, 'success');
        
        // Auto capture after delay
        if (!this.faceReadyTimeout) {
          this.faceReadyTimeout = setTimeout(() => {
            this.captureFaceImage();
          }, config.auto_capture_delay_ms || 1500);
        }
      } else {
        if (this.faceReadyTimeout) {
          clearTimeout(this.faceReadyTimeout);
          this.faceReadyTimeout = null;
        }
        
        const message = window.FaceAngleUtils.getTiltGuidanceMessage(roll, pitch, yaw, config);
        const type = confidence < config.confidence_threshold ? 'warning' : 'info';
        this.faceOverlay.updateHint(message, type);
      }
    }

    // Update instruction text
    if (this.dom.captureView.instruction) {
      if (validation.passed) {
        this.dom.captureView.instruction.textContent = 'Rất tốt! Giữ nguyên...';
      } else {
        this.dom.captureView.instruction.textContent = validation.reason;
      }
    }

    // Log telemetry
    if (ekycConfig?.telemetry?.enabled) {
      this.logFaceTelemetry({
        roll, pitch, yaw, confidence,
        passed: validation.passed,
        reason: validation.reason
      });
    }
  },

  /**
   * Handle no face detected
   */
  handleNoFaceDetected() {
    if (this.faceReadyTimeout) {
      clearTimeout(this.faceReadyTimeout);
      this.faceReadyTimeout = null;
    }

    if (this.faceOverlay) {
      this.faceOverlay.clearCanvas();
      this.faceOverlay.updateHint('Đang tìm khuôn mặt...', 'info');
    }

    if (this.dom.captureView.instruction) {
      this.dom.captureView.instruction.textContent = 'Đưa khuôn mặt vào trong khung';
    }
  },

  /**
   * Capture face image
   */
  async captureFaceImage() {
    // Capturing face image
    
    this.faceDetectionActive = false;
    
    if (this.faceOverlay) {
      this.faceOverlay.updateHint('Đang chụp...', 'success');
    }

    // Trigger capture (sử dụng method có sẵn)
    await this.triggerCapture(true);

    // Cleanup
    if (this.faceReadyTimeout) {
      clearTimeout(this.faceReadyTimeout);
      this.faceReadyTimeout = null;
    }
  },

  /**
   * Stop face detection
   */
  stopFaceDetection() {
    this.faceDetectionActive = false;
    
    if (this.faceReadyTimeout) {
      clearTimeout(this.faceReadyTimeout);
      this.faceReadyTimeout = null;
    }

    if (this.rollSmoother) {
      this.rollSmoother.reset();
    }

    if (this.faceOverlay) {
      this.faceOverlay.clearCanvas();
    }
  },

  /**
   * Submit error report
   */
  async submitErrorReport(errorData) {
    if (!ekycConfig?.error_reporting?.enabled) return;

    const config = ekycConfig.error_reporting;
    
    // Check user consent
    if (config.require_user_consent && !errorData.userConsent) {
      return;
    }

    try {
      const endpoint = config.api_endpoint || '/api/ekyc/error-report';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: this.generateSessionId(),
          timestamp: new Date().toISOString(),
          roll: errorData.roll || 0,
          pitch: errorData.pitch || 0,
          yaw: errorData.yaw || 0,
          confidence: errorData.confidence || 0,
          message: errorData.message || 'Unknown error',
          imageBase64: errorData.imageBase64 || null,
          deviceInfo: this.getDeviceInfo(),
          attemptCount: this.faceAttemptCount || 0,
          userConsent: errorData.userConsent || false
        })
      });

      const result = await response.json();
      // Error report submitted successfully
      
      return result;

    } catch (error) {
      // Failed to submit error report
    }
  },

  /**
   * Generate session ID
   */
  generateSessionId() {
    if (!this.sessionId) {
      this.sessionId = 'ekyc_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    return this.sessionId;
  },

  /**
   * Get device info
   */
  getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      devicePixelRatio: window.devicePixelRatio,
      os: this.detectOS(),
      browser: this.detectBrowser()
    };
  },

  /**
   * Detect OS
   */
  detectOS() {
    const ua = navigator.userAgent;
    if (ua.indexOf('Win') !== -1) return 'Windows';
    if (ua.indexOf('Mac') !== -1) return 'macOS';
    if (ua.indexOf('Linux') !== -1) return 'Linux';
    if (ua.indexOf('Android') !== -1) return 'Android';
    if (ua.indexOf('iOS') !== -1 || ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1) return 'iOS';
    return 'Unknown';
  },

  /**
   * Detect browser
   */
  detectBrowser() {
    const ua = navigator.userAgent;
    if (ua.indexOf('Chrome') !== -1) return 'Chrome';
    if (ua.indexOf('Safari') !== -1) return 'Safari';
    if (ua.indexOf('Firefox') !== -1) return 'Firefox';
    if (ua.indexOf('Edge') !== -1) return 'Edge';
    return 'Unknown';
  },

  /**
   * Log telemetry
   */
  logFaceTelemetry(data) {
    // Implement telemetry logging
    // Telemetry data would be logged here
  }
};

// Export mixin để có thể extend EkycApp
if (typeof window !== 'undefined') {
  window.FaceDetectionMixin = FaceDetectionMixin;
}

// Auto-extend EkycApp nếu đã tồn tại
if (typeof window !== 'undefined' && window.EkycApp) {
  Object.assign(window.EkycApp.prototype, FaceDetectionMixin);
  // FaceDetectionMixin applied to EkycApp
}
