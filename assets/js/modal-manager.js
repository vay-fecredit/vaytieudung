/**
 * Modal Manager - Handles modal dialogs with accessibility features
 * Includes focus trap, keyboard navigation, and ARIA attributes
 */

class ModalManager {
    constructor() {
        this.activeModal = null;
        this.previousFocusElement = null;
        this.focusableElements = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
    }

    /**
     * Open a modal dialog
     * @param {string} modalId - ID of the modal to open
     */
    open(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) {
            // Error: Modal not found
            return;
        }

        // Store current focus element
        this.previousFocusElement = document.activeElement;

        // Show modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');

        // Set active modal
        this.activeModal = modal;

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Focus first focusable element or modal itself
        this.setInitialFocus(modal);

        // Setup focus trap
        this.setupFocusTrap(modal);

        // Setup keyboard handlers
        this.setupKeyboardHandlers(modal);

        // Add event listener for close buttons
        this.setupCloseButtons(modal);
    }

    /**
     * Close the currently active modal
     */
    close() {
        if (!this.activeModal) return;

        // Hide modal
        this.activeModal.classList.remove('active');
        this.activeModal.setAttribute('aria-hidden', 'true');

        // Restore body scroll
        document.body.style.overflow = '';

        // Restore focus
        if (this.previousFocusElement) {
            this.previousFocusElement.focus();
        }

        // Clean up
        this.activeModal = null;
        this.previousFocusElement = null;
    }

    /**
     * Set initial focus when modal opens
     * @param {HTMLElement} modal - Modal element
     */
    setInitialFocus(modal) {
        const focusableElements = modal.querySelectorAll(this.focusableElements);
        
        if (focusableElements.length > 0) {
            // Focus first element that's not a close button
            const firstElement = Array.from(focusableElements).find(
                el => !el.classList.contains('close-btn') && !el.classList.contains('modal_close')
            ) || focusableElements[0];
            
            firstElement.focus();
        } else {
            modal.setAttribute('tabindex', '-1');
            modal.focus();
        }
    }

    /**
     * Setup focus trap to keep focus within modal
     * @param {HTMLElement} modal - Modal element
     */
    setupFocusTrap(modal) {
        const focusableElements = modal.querySelectorAll(this.focusableElements);
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Handle Tab key
        modal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    /**
     * Setup keyboard handlers (Escape to close)
     * @param {HTMLElement} modal - Modal element
     */
    setupKeyboardHandlers(modal) {
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.close();
                document.removeEventListener('keydown', escapeHandler);
            }
        };

        document.addEventListener('keydown', escapeHandler);
    }

    /**
     * Setup close button handlers
     * @param {HTMLElement} modal - Modal element
     */
    setupCloseButtons(modal) {
        const closeButtons = modal.querySelectorAll('.close-btn, .modal_close, [data-modal-close]');
        
        closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.close();
            });
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });
    }

    /**
     * Show a message in a modal
     * @param {string} message - Message to display
     * @param {string} modalId - ID of the modal (default: 'popup-success')
     */
    showMessage(message, modalId = 'popup-success') {
        const messageElement = document.getElementById('message_message');
        if (messageElement) {
            // Use textContent to prevent XSS
            messageElement.textContent = message;
        }
        this.open(modalId);
    }
}

// Create global instance
const modalManager = new ModalManager();

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.ModalManager = ModalManager;
    window.modalManager = modalManager;
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModalManager;
}
