/**
 * FE CREDIT MOBILE FIXES
 * JavaScript utilities for mobile optimization
 * Version: 1.0.0
 */

(function() {
    'use strict';

    // ============================================
    // MOBILE FORM VALIDATOR
    // ============================================
    class MobileFormValidator {
        constructor(formId) {
            this.form = document.getElementById(formId);
            if (!this.form) {
                console.warn(`Form with id "${formId}" not found`);
                return;
            }
            this.init();
        }

        init() {
            // Prevent iOS zoom on input focus
            this.preventIOSZoom();
            
            // Add touch-friendly validation
            this.addTouchValidation();
            
            // Setup auto-save
            this.setupAutoSave();
        }

        preventIOSZoom() {
            const inputs = this.form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                // Ensure font-size is at least 16px to prevent iOS zoom
                const computedFontSize = window.getComputedStyle(input).fontSize;
                const fontSize = parseFloat(computedFontSize);
                if (fontSize < 16) {
                    input.style.fontSize = '16px';
                }
            });
        }

        addTouchValidation() {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (this.validateAll()) {
                    this.showLoadingIndicator();
                    this.submitForm();
                } else {
                    this.focusFirstError();
                }
            });
        }

        validateAll() {
            let isValid = true;
            const inputs = this.form.querySelectorAll('input[required], select[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!this.validateInput(input)) {
                    isValid = false;
                }
            });
            
            return isValid;
        }

        validateInput(input) {
            const value = input.value.trim();
            const errorElement = input.parentElement.querySelector('.error-message');
            
            // Remove existing error
            if (errorElement) {
                errorElement.remove();
            }
            
            // Check if required field is empty
            if (input.hasAttribute('required') && !value) {
                this.showError(input, 'Trường này là bắt buộc');
                return false;
            }
            
            // Email validation
            if (input.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    this.showError(input, 'Email không hợp lệ');
                    return false;
                }
            }
            
            // Phone validation (Vietnamese format)
            if (input.type === 'tel' && value) {
                const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
                if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                    this.showError(input, 'Số điện thoại không hợp lệ');
                    return false;
                }
            }
            
            input.classList.remove('error');
            return true;
        }

        showError(input, message) {
            input.classList.add('error');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.setAttribute('role', 'alert');
            
            input.parentElement.appendChild(errorDiv);
        }

        focusFirstError() {
            const firstError = this.form.querySelector('.error');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        showLoadingIndicator() {
            const submitBtn = this.form.querySelector('[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="loading-spinner"></span> Đang xử lý...';
            }
        }

        submitForm() {
            // This should be overridden by the specific form implementation
            console.log('Form validated successfully');
        }

        setupAutoSave() {
            const inputs = this.form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => {
                    this.autoSaveFormData();
                });
            });
        }

        autoSaveFormData() {
            const formData = new FormData(this.form);
            const data = {};
            
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Use AutoSave class to save with encryption
            if (window.AutoSave) {
                const autoSave = new AutoSave();
                autoSave.saveData(this.form.id, data);
            }
        }
    }

    // ============================================
    // RESPONSIVE CANVAS RENDERER
    // ============================================
    window.renderResponsiveCanvas = function(canvasId, imageUrl, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            console.warn(`Canvas with id "${canvasId}" not found`);
            return;
        }

        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;
        const containerWidth = container?.clientWidth || window.innerWidth;
        
        // Calculate responsive dimensions
        const maxWidth = Math.min(containerWidth * 0.95, options.maxWidth || 800);
        const aspectRatio = options.aspectRatio || 1.414; // A4 ratio
        
        // Set canvas dimensions
        canvas.width = maxWidth;
        canvas.height = maxWidth * aspectRatio;
        
        // Load and draw image
        if (imageUrl) {
            const img = new Image();
            img.onload = function() {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.onerror = function() {
                console.error('Failed to load image:', imageUrl);
            };
            img.src = imageUrl;
        }
        
        // Make canvas responsive to window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                window.renderResponsiveCanvas(canvasId, imageUrl, options);
            }, 250);
        });
    };

    // ============================================
    // AUTO-SAVE WITH ENCRYPTION
    // ============================================
    class AutoSave {
        constructor() {
            this.storageKey = 'fecredit_form_data';
            this.secretKey = 'fecredit-secret-key-2024';
        }

        saveData(formId, data) {
            try {
                // Add timestamp
                const dataWithMeta = {
                    formId: formId,
                    data: data,
                    timestamp: new Date().toISOString(),
                    version: '1.0.0'
                };
                
                // Simple obfuscation using base64 encoding
                // WARNING: This is NOT secure encryption, just basic obfuscation
                // For production, use a proper encryption library like CryptoJS:
                // const encrypted = CryptoJS.AES.encrypt(JSON.stringify(dataWithMeta), secretKey).toString();
                const encrypted = btoa(JSON.stringify(dataWithMeta));
                localStorage.setItem(`${this.storageKey}_${formId}`, encrypted);
                
                console.log('Form data auto-saved successfully');
            } catch (error) {
                console.error('Failed to save form data:', error);
            }
        }

        loadData(formId) {
            try {
                const encrypted = localStorage.getItem(`${this.storageKey}_${formId}`);
                if (!encrypted) {
                    return null;
                }
                
                // Decrypt
                const decrypted = atob(encrypted);
                const dataWithMeta = JSON.parse(decrypted);
                
                // Check if data is not too old (7 days)
                const savedTime = new Date(dataWithMeta.timestamp);
                const now = new Date();
                const daysDiff = (now - savedTime) / (1000 * 60 * 60 * 24);
                
                if (daysDiff > 7) {
                    this.clearData(formId);
                    return null;
                }
                
                return dataWithMeta.data;
            } catch (error) {
                console.error('Failed to load form data:', error);
                return null;
            }
        }

        clearData(formId) {
            localStorage.removeItem(`${this.storageKey}_${formId}`);
        }
    }

    // ============================================
    // TOUCH-FRIENDLY INTERACTIONS
    // ============================================
    function initTouchInteractions() {
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.btn, button, [role="button"]');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Add touch feedback for all interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select');
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 100);
            });
        });
    }

    // ============================================
    // PREVENT DOUBLE SUBMIT
    // ============================================
    function preventDoubleSubmit() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            let isSubmitting = false;
            
            form.addEventListener('submit', function(e) {
                if (isSubmitting) {
                    e.preventDefault();
                    return false;
                }
                isSubmitting = true;
                
                // Re-enable after 3 seconds in case of error
                setTimeout(() => {
                    isSubmitting = false;
                }, 3000);
            });
        });
    }

    // ============================================
    // LAZY LOAD IMAGES
    // ============================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // ============================================
    // FIX VIEWPORT HEIGHT ON MOBILE
    // ============================================
    function fixViewportHeight() {
        // Fix for mobile browsers where 100vh doesn't account for address bar
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);
    }

    // ============================================
    // SMOOTH SCROLL TO ANCHORS
    // ============================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================
    // INPUT SANITIZATION
    // ============================================
    function sanitizeInput(input) {
        // Remove HTML tags and script content
        let value = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        value = value.replace(/<[^>]+>/g, '');
        
        // Encode special characters
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;'
        };
        
        return value.replace(/[&<>"'/]/g, char => map[char]);
    }

    // Make sanitizeInput globally available
    window.sanitizeInput = sanitizeInput;

    // ============================================
    // INITIALIZE ON DOM READY
    // ============================================
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    }

    function initAll() {
        initTouchInteractions();
        preventDoubleSubmit();
        initLazyLoading();
        fixViewportHeight();
        initSmoothScroll();
        
        console.log('FE Credit Mobile Fixes initialized');
    }

    // Export classes to global scope
    window.MobileFormValidator = MobileFormValidator;
    window.AutoSave = AutoSave;
    
    // Auto-initialize
    init();
})();
