/**
 * FE Credit Inspired Interactive Features
 * Features: FAQ Accordion, Sticky Header, Partners Slider, Form Validation, Smooth Scroll
 */

(function() {
    'use strict';

    // ===================================
    // DOM Elements
    // ===================================
    const header = document.getElementById('header');
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarMenu = document.getElementById('navbarMenu');
    const faqItems = document.querySelectorAll('.faq-item');
    const backToTopBtn = document.getElementById('backToTop');
    const loanForm = document.getElementById('loanRegistrationForm');
    const partnersSlider = document.getElementById('partnersSlider');

    // ===================================
    // Sticky Header on Scroll
    // ===================================
    function initStickyHeader() {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ===================================
    // Mobile Navigation Toggle
    // ===================================
    function initMobileNav() {
        if (navbarToggler && navbarMenu) {
            navbarToggler.addEventListener('click', function() {
                navbarMenu.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const navLinks = navbarMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navbarMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navbarToggler.contains(e.target) && !navbarMenu.contains(e.target)) {
                    navbarMenu.classList.remove('active');
                }
            });
        }
    }

    // ===================================
    // FAQ Accordion
    // ===================================
    function initFAQAccordion() {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }

    // ===================================
    // Back to Top Button
    // ===================================
    function initBackToTop() {
        if (backToTopBtn) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            });

            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    function initSmoothScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===================================
    // Form Validation
    // ===================================
    function initFormValidation() {
        if (loanForm) {
            loanForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const fullName = document.getElementById('fullName').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const email = document.getElementById('email').value.trim();
                const loanAmount = document.getElementById('loanAmount').value;
                const loanTerm = document.getElementById('loanTerm').value;
                const agree = document.querySelector('input[name="agree"]').checked;
                
                // Validation
                let isValid = true;
                let errorMessage = '';
                
                if (!fullName) {
                    isValid = false;
                    errorMessage += 'Vui lòng nhập họ và tên.\n';
                }
                
                if (!phone) {
                    isValid = false;
                    errorMessage += 'Vui lòng nhập số điện thoại.\n';
                } else if (!validatePhone(phone)) {
                    isValid = false;
                    errorMessage += 'Số điện thoại không hợp lệ.\n';
                }
                
                if (email && !validateEmail(email)) {
                    isValid = false;
                    errorMessage += 'Email không hợp lệ.\n';
                }
                
                if (!loanAmount) {
                    isValid = false;
                    errorMessage += 'Vui lòng chọn số tiền vay.\n';
                }
                
                if (!loanTerm) {
                    isValid = false;
                    errorMessage += 'Vui lòng chọn thời gian vay.\n';
                }
                
                if (!agree) {
                    isValid = false;
                    errorMessage += 'Vui lòng đồng ý với điều khoản sử dụng.\n';
                }
                
                if (isValid) {
                    // Show success message
                    showNotification('success', 'Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.');
                    
                    // Log form data (in production, send to server)
                    // TODO: Send form data to server
                    // Form data: fullName, phone, email, loanAmount, loanTerm, productType, note
                    
                    // Reset form
                    loanForm.reset();
                } else {
                    showNotification('error', errorMessage);
                }
            });
        }
    }

    // ===================================
    // Validation Helpers
    // ===================================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        // Vietnamese phone number format
        const re = /^(0|\+84)[0-9]{9,10}$/;
        return re.test(phone.replace(/\s/g, ''));
    }

    // ===================================
    // Notification System
    // ===================================
    function showNotification(type, message) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            padding: 20px;
            background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div style="white-space: pre-line;">${message}</div>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; margin-left: 10px;">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // Partners Slider Auto-scroll
    // ===================================
    function initPartnersSlider() {
        if (partnersSlider) {
            let scrollInterval;
            let isHovering = false;
            
            // Auto-scroll functionality
            function startAutoScroll() {
                scrollInterval = setInterval(() => {
                    if (!isHovering) {
                        partnersSlider.scrollLeft += 2;
                        
                        // Reset to start when reaching end
                        if (partnersSlider.scrollLeft >= partnersSlider.scrollWidth - partnersSlider.clientWidth) {
                            partnersSlider.scrollLeft = 0;
                        }
                    }
                }, 30);
            }
            
            // Stop on hover
            partnersSlider.addEventListener('mouseenter', () => {
                isHovering = true;
            });
            
            partnersSlider.addEventListener('mouseleave', () => {
                isHovering = false;
            });
            
            // Start auto-scroll
            startAutoScroll();
        }
    }

    // ===================================
    // Animate on Scroll
    // ===================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements
        const animateElements = document.querySelectorAll('.benefit-card, .process-step, .faq-item');
        animateElements.forEach(el => observer.observe(el));
    }

    // ===================================
    // Form Input Focus Effects
    // ===================================
    function initFormInputEffects() {
        const formControls = document.querySelectorAll('.form-control');
        
        formControls.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }

    // ===================================
    // Loan Calculator (Simple)
    // ===================================
    function initLoanCalculator() {
        const loanAmountInput = document.getElementById('loanAmount');
        const loanTermInput = document.getElementById('loanTerm');
        
        if (loanAmountInput && loanTermInput) {
            function calculateMonthlyPayment() {
                const amount = parseFloat(loanAmountInput.value);
                const term = parseInt(loanTermInput.value);
                
                if (amount && term) {
                    // Simple calculation (11.5% annual interest rate)
                    const annualRate = 0.115;
                    const monthlyRate = annualRate / 12;
                    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                                          (Math.pow(1 + monthlyRate, term) - 1);
                    
                    // Monthly payment calculated: monthlyPayment.toFixed(0) VNĐ
                }
            }
            
            loanAmountInput.addEventListener('change', calculateMonthlyPayment);
            loanTermInput.addEventListener('change', calculateMonthlyPayment);
        }
    }

    // ===================================
    // Initialize All Features
    // ===================================
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initializeFeatures();
            });
        } else {
            initializeFeatures();
        }
    }

    function initializeFeatures() {
        initStickyHeader();
        initMobileNav();
        initFAQAccordion();
        initBackToTop();
        initSmoothScroll();
        initFormValidation();
        initPartnersSlider();
        initScrollAnimations();
        initFormInputEffects();
        initLoanCalculator();
        
        // FE Credit Inspired Page - All features initialized successfully!
    }

    // Start initialization
    init();

})();
