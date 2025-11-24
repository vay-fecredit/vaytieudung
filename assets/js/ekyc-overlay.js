/**
 * eKYC Overlay UI Component
 * Hiển thị hướng dẫn trực quan cho người dùng trong quá trình xác thực khuôn mặt
 * Version: 1.0.0
 * Date: 2025-11-10
 */

class EKYCOverlay {
  /**
   * Constructor
   * @param {string} containerId - ID của container element
   * @param {Object} config - Configuration object từ ekyc-config.json
   */
  constructor(containerId, config) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);
    this.config = config || {};
    this.isInitialized = false;
    this.currentLanguage = 'vi';
    
    if (!this.container) {
      // Error: EKYCOverlay container not found
      return;
    }
    
    this.init();
  }
  
  /**
   * Khởi tạo overlay UI
   */
  init() {
    if (this.isInitialized) return;
    
    // Tạo HTML structure
    this.container.innerHTML = `
      <div class="ekyc-overlay-wrapper">
        <!-- Canvas để vẽ face box và landmarks -->
        <canvas id="ekyc-overlay-canvas" class="ekyc-overlay-canvas"></canvas>
        
        <!-- Tilt meter (thanh đo độ nghiêng) -->
        <div class="ekyc-tilt-meter" id="ekyc-tilt-meter">
          <div class="ekyc-tilt-label">
            Độ nghiêng: <span id="ekyc-tilt-value" class="ekyc-tilt-value">0°</span>
          </div>
          <div class="ekyc-tilt-bar">
            <div class="ekyc-tilt-indicator" id="ekyc-tilt-indicator"></div>
          </div>
        </div>
        
        <!-- Hint message -->
        <div class="ekyc-hint-message" id="ekyc-hint-message">
          Giữ máy ngang tầm mắt
        </div>
        
        <!-- Face guide box (khung hình oval hướng dẫn) -->
        <div class="ekyc-face-guide-box" id="ekyc-face-guide"></div>
        
        <!-- Angle indicators (hiển thị roll, pitch, yaw) -->
        <div class="ekyc-angle-indicators" id="ekyc-angle-indicators" style="display: none;">
          <div class="ekyc-angle-item">
            <span class="ekyc-angle-label">Roll:</span>
            <span class="ekyc-angle-value" id="ekyc-roll-value">0°</span>
          </div>
          <div class="ekyc-angle-item">
            <span class="ekyc-angle-label">Pitch:</span>
            <span class="ekyc-angle-value" id="ekyc-pitch-value">0°</span>
          </div>
          <div class="ekyc-angle-item">
            <span class="ekyc-angle-label">Yaw:</span>
            <span class="ekyc-angle-value" id="ekyc-yaw-value">0°</span>
          </div>
        </div>
      </div>
    `;
    
    // Cache DOM elements
    this.canvas = document.getElementById('ekyc-overlay-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.tiltMeter = document.getElementById('ekyc-tilt-meter');
    this.tiltValue = document.getElementById('ekyc-tilt-value');
    this.tiltIndicator = document.getElementById('ekyc-tilt-indicator');
    this.hintMessage = document.getElementById('ekyc-hint-message');
    this.faceGuide = document.getElementById('ekyc-face-guide');
    this.angleIndicators = document.getElementById('ekyc-angle-indicators');
    this.rollValue = document.getElementById('ekyc-roll-value');
    this.pitchValue = document.getElementById('ekyc-pitch-value');
    this.yawValue = document.getElementById('ekyc-yaw-value');
    
    // Set canvas size to match container
    if (this.canvas && this.container) {
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    this.isInitialized = true;
    // EKYCOverlay initialized successfully
  }
  
  /**
   * Resize canvas to match video/container size
   */
  resizeCanvas() {
    if (!this.canvas || !this.container) return;
    
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }
  
  /**
   * Set canvas size explicitly
   * @param {number} width 
   * @param {number} height 
   */
  setCanvasSize(width, height) {
    if (!this.canvas) return;
    this.canvas.width = width;
    this.canvas.height = height;
  }
  
  /**
   * Cập nhật tilt meter
   * @param {number} roll - Góc nghiêng (degrees)
   */
  updateTiltMeter(roll) {
    if (!this.tiltValue || !this.tiltIndicator) return;
    
    const maxAngle = this.config.roll_hard_threshold || 15;
    const softThreshold = this.config.roll_soft_threshold || 10;
    const percentage = Math.min(Math.abs(roll) / maxAngle * 100, 100);
    
    this.tiltValue.textContent = `${Math.abs(roll).toFixed(0)}°`;
    this.tiltIndicator.style.width = `${percentage}%`;
    
    // Color coding
    if (Math.abs(roll) <= softThreshold) {
      this.tiltIndicator.style.backgroundColor = '#4CAF50'; // green
      this.tiltIndicator.classList.remove('warning', 'danger');
      this.tiltIndicator.classList.add('success');
    } else if (Math.abs(roll) <= maxAngle) {
      this.tiltIndicator.style.backgroundColor = '#FFC107'; // yellow
      this.tiltIndicator.classList.remove('success', 'danger');
      this.tiltIndicator.classList.add('warning');
    } else {
      this.tiltIndicator.style.backgroundColor = '#F44336'; // red
      this.tiltIndicator.classList.remove('success', 'warning');
      this.tiltIndicator.classList.add('danger');
    }
  }
  
  /**
   * Cập nhật angle indicators (debug mode)
   * @param {number} roll 
   * @param {number} pitch 
   * @param {number} yaw 
   */
  updateAngleIndicators(roll, pitch, yaw) {
    if (!this.rollValue || !this.pitchValue || !this.yawValue) return;
    
    this.rollValue.textContent = `${roll.toFixed(1)}°`;
    this.pitchValue.textContent = `${pitch.toFixed(1)}°`;
    this.yawValue.textContent = `${yaw.toFixed(1)}°`;
  }
  
  /**
   * Hiển thị/ẩn angle indicators
   * @param {boolean} show 
   */
  toggleAngleIndicators(show) {
    if (!this.angleIndicators) return;
    this.angleIndicators.style.display = show ? 'block' : 'none';
  }
  
  /**
   * Cập nhật hint message
   * @param {string} message 
   * @param {string} type - 'success', 'warning', 'error', 'info'
   */
  updateHint(message, type = 'info') {
    if (!this.hintMessage) return;
    
    this.hintMessage.textContent = message;
    
    // Remove all type classes
    this.hintMessage.classList.remove('success', 'warning', 'error', 'info');
    
    // Add new type class
    this.hintMessage.classList.add(type);
  }
  
  /**
   * Vẽ face box và landmarks lên canvas
   * @param {Object} detection - Face detection object from face-api.js
   */
  drawFaceBox(detection) {
    if (!this.canvas || !this.ctx || !detection) return;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Vẽ bounding box
    if (detection.box) {
      const { x, y, width, height } = detection.box;
      
      this.ctx.strokeStyle = '#00FF00';
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(x, y, width, height);
      
      // Vẽ góc bo tròn
      this.ctx.strokeStyle = '#00FF00';
      this.ctx.lineWidth = 4;
      const cornerLength = 20;
      
      // Top-left
      this.ctx.beginPath();
      this.ctx.moveTo(x, y + cornerLength);
      this.ctx.lineTo(x, y);
      this.ctx.lineTo(x + cornerLength, y);
      this.ctx.stroke();
      
      // Top-right
      this.ctx.beginPath();
      this.ctx.moveTo(x + width - cornerLength, y);
      this.ctx.lineTo(x + width, y);
      this.ctx.lineTo(x + width, y + cornerLength);
      this.ctx.stroke();
      
      // Bottom-left
      this.ctx.beginPath();
      this.ctx.moveTo(x, y + height - cornerLength);
      this.ctx.lineTo(x, y + height);
      this.ctx.lineTo(x + cornerLength, y + height);
      this.ctx.stroke();
      
      // Bottom-right
      this.ctx.beginPath();
      this.ctx.moveTo(x + width - cornerLength, y + height);
      this.ctx.lineTo(x + width, y + height);
      this.ctx.lineTo(x + width, y + height - cornerLength);
      this.ctx.stroke();
    }
    
    // Vẽ landmarks nếu có
    if (detection.landmarks) {
      this.ctx.fillStyle = '#00FF00';
      const positions = detection.landmarks.positions || detection.landmarks._positions;
      
      if (positions && positions.length) {
        positions.forEach(point => {
          this.ctx.beginPath();
          this.ctx.arc(point.x || point._x, point.y || point._y, 2, 0, 2 * Math.PI);
          this.ctx.fill();
        });
      }
    }
  }
  
  /**
   * Clear canvas
   */
  clearCanvas() {
    if (!this.canvas || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  /**
   * Hiển thị/ẩn tilt meter
   * @param {boolean} show 
   */
  toggleTiltMeter(show) {
    if (!this.tiltMeter) return;
    this.tiltMeter.style.display = show ? 'block' : 'none';
  }
  
  /**
   * Hiển thị/ẩn face guide box
   * @param {boolean} show 
   */
  toggleFaceGuide(show) {
    if (!this.faceGuide) return;
    this.faceGuide.style.display = show ? 'block' : 'none';
  }
  
  /**
   * Set overlay visibility
   * @param {boolean} visible 
   */
  setVisible(visible) {
    if (!this.container) return;
    this.container.style.display = visible ? 'block' : 'none';
  }
  
  /**
   * Set language
   * @param {string} lang - 'vi' or 'en'
   */
  setLanguage(lang) {
    this.currentLanguage = lang;
  }
  
  /**
   * Get translated message
   * @param {string} key 
   * @param {Object} params 
   * @returns {string}
   */
  getMessage(key, params = {}) {
    const messages = this.config.messages?.[this.currentLanguage] || {};
    let message = messages[key] || key;
    
    // Replace placeholders
    Object.keys(params).forEach(param => {
      message = message.replace(`{${param}}`, params[param]);
    });
    
    return message;
  }
  
  /**
   * Destroy overlay
   */
  destroy() {
    if (this.canvas) {
      window.removeEventListener('resize', () => this.resizeCanvas());
    }
    
    if (this.container) {
      this.container.innerHTML = '';
    }
    
    this.isInitialized = false;
    // EKYCOverlay destroyed
  }
}

// Export for browser
if (typeof window !== 'undefined') {
  window.EKYCOverlay = EKYCOverlay;
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EKYCOverlay;
}
