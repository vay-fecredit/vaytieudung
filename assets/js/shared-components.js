/**
 * Shared Components JavaScript
 * Banner Carousel, Menu Toggle, Input Mask Fallback, EmailJS Config
 */

(function() {
  'use strict';

  /* ========================================
     BANNER CAROUSEL
     ======================================== */
  
  const BannerCarousel = {
    init: function(slideCount = 3) {
      this.slideCount = slideCount;
      this.bannerIndex = 0;
      this.bannerInterval = null;
      
      // Initialize if banner exists
      if (document.querySelector('.banner-hero')) {
        this.updateBanner();
        this.startRotation();
        this.setupEventListeners();
      }
    },
    
    changeSlide: function(n) {
      this.bannerIndex = (this.bannerIndex + n + this.slideCount) % this.slideCount;
      this.updateBanner();
    },
    
    goToSlide: function(n) {
      this.bannerIndex = n;
      this.updateBanner();
    },
    
    updateBanner: function() {
      const slides = document.querySelectorAll(".slider-item");
      const dots = document.querySelectorAll(".slick-dots li");
      
      if (slides.length > 0) {
        slides.forEach((slide, i) => {
          slide.classList.toggle("active", i === this.bannerIndex);
        });
      }
      
      if (dots.length > 0) {
        dots.forEach((dot, i) => {
          dot.classList.toggle("slick-active", i === this.bannerIndex);
        });
      }
    },
    
    startRotation: function() {
      if (this.bannerInterval) {
        clearInterval(this.bannerInterval);
      }
      
      this.bannerInterval = setInterval(() => {
        this.bannerIndex = (this.bannerIndex + 1) % this.slideCount;
        this.updateBanner();
      }, 5000);
    },
    
    stopRotation: function() {
      if (this.bannerInterval) {
        clearInterval(this.bannerInterval);
        this.bannerInterval = null;
      }
    },
    
    setupEventListeners: function() {
      // Expose global functions for onclick handlers
      window.changeSlide = (n) => this.changeSlide(n);
      window.goToSlide = (n) => {
        this.stopRotation();
        this.goToSlide(n);
        this.startRotation();
      };
      
      // Pause on hover
      const bannerHero = document.querySelector('.banner-hero');
      if (bannerHero) {
        bannerHero.addEventListener('mouseenter', () => this.stopRotation());
        bannerHero.addEventListener('mouseleave', () => this.startRotation());
      }
    }
  };

  /* ========================================
     MENU TOGGLE
     ======================================== */
  
  const MenuToggle = {
    init: function() {
      this.setupToggle();
    },
    
    setupToggle: function() {
      const toggleButtons = document.querySelectorAll('.hamburger, .c-hamburger, [onclick*="toggleMenu"], [onclick*="toggleHamburgerMenu"]');
      
      toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          this.toggleMenu();
        });
      });
    },
    
    toggleMenu: function() {
      const menu = document.getElementById("nav-menu");
      const hamburger = document.querySelector(".hamburger, .c-hamburger");
      const hamburgerMenu = document.querySelector(".hamburger-menu");
      const overlay = document.getElementById("hamburgerOverlay");
      
      // New menu structure
      if (menu) {
        menu.classList.toggle("show");
        if (hamburger) {
          hamburger.setAttribute("aria-expanded", menu.classList.contains("show"));
          hamburger.classList.toggle("is-active");
        }
      }
      
      // Legacy hamburger menu
      if (hamburgerMenu) {
        hamburgerMenu.classList.toggle("show");
        if (overlay) {
          overlay.classList.toggle("show");
        }
        if (hamburger) {
          hamburger.classList.toggle("is-active");
          hamburger.setAttribute("aria-expanded", hamburgerMenu.classList.contains("show"));
        }
      }
    }
  };

  /* ========================================
     INPUT MASK FALLBACK
     ======================================== */
  
  const InputMaskFallback = {
    init: function() {
      if (!window.Inputmask || typeof window.Inputmask !== 'function') {
        window.Inputmask = function(options) {
          console.warn("Inputmask not loaded, using fallback. Input formatting disabled.");
          return {
            mask: function(element) {
              if (!element) return this;
              
              // Basic fallback for phone numbers
              if (options && options.mask && typeof options.mask === 'string') {
                if (options.mask.includes('9') || options.mask.includes('0')) {
                  element.addEventListener('input', function() {
                    let value = this.value.replace(/\D/g, '');
                    const maxLength = options.mask.replace(/[^09]/g, '').length;
                    if (value.length > maxLength) {
                      value = value.slice(0, maxLength);
                    }
                    this.value = value;
                  });
                }
              }
              
              return this;
            }
          };
        };
      }
    }
  };

  /* ========================================
     EMAILJS CONFIGURATION
     ======================================== */
  
  const EmailJSConfig = {
    init: function() {
      if (typeof emailjs !== 'undefined') {
        try {
          emailjs.init("J4YH-lyfEfxXeu7aV");
        } catch (error) {
          console.warn("EmailJS initialization failed:", error);
        }
      }
    }
  };

  /* ========================================
     INITIALIZATION
     ======================================== */
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Initialize banner carousel (default 3 slides, can be overridden)
    const slides = document.querySelectorAll('.slider-item');
    if (slides.length > 0) {
      BannerCarousel.init(slides.length);
    }
    
    // Initialize menu toggle
    MenuToggle.init();
    
    // Initialize input mask fallback
    InputMaskFallback.init();
    
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
      EmailJSConfig.init();
    } else {
      // Wait for EmailJS to load
      const checkEmailJS = setInterval(() => {
        if (typeof emailjs !== 'undefined') {
          EmailJSConfig.init();
          clearInterval(checkEmailJS);
        }
      }, 100);
      
      // Stop checking after 5 seconds
      setTimeout(() => clearInterval(checkEmailJS), 5000);
    }
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (BannerCarousel.bannerInterval) {
      clearInterval(BannerCarousel.bannerInterval);
    }
  });

  // Expose global functions for compatibility
  window.toggleMenu = () => MenuToggle.toggleMenu();
  window.toggleHamburgerMenu = () => MenuToggle.toggleMenu();

})();

