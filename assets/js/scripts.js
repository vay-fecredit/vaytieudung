// js/scripts.js
// Note: This file depends on utils.js - ensure utils.js is loaded first

// Initialize EmailJS
(function () {
    emailjs.init("OrBsI926QI2_xBh1f"); // Replace with actual User ID
})();

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// Form data
let formData = {
    contractImage: "public/documents/contract.pdf",
    disbursementImage: "public/documents/disbursement.pdf",
    fallbackImage: "https://via.placeholder.com/720x1018?text=Hinh+Anh+Mac+Dinh",
    fallbackProfileImage: "https://via.placeholder.com/150x150?text=Anh+Ho+So"
};

// User data
let userData = { qrData: {}, currentStep: 1 };

// Load user data from localStorage
function loadUserData() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
        userData = JSON.parse(savedData);
    }
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Utility functions are now imported from utils.js:
// - formatNumber, formatNumberInput, unformatNumber
// - generateContractId, generateRandomCode, generateLoanCode
// - getCurrentDate, getDateComponents
// - calculateInterestRate, calculateMonthlyPayment

// Check if image is captured or uploaded
function checkImageInput(frontInputId, backInputId) {
    const frontFile = document.getElementById(frontInputId)?.files[0];
    const backFile = document.getElementById(backInputId)?.files[0];
    return frontFile || backFile;
}

// Render canvas for contract and disbursement
function renderCanvas(canvasId, imageUrl, userData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    // Clean up previous canvas state to prevent memory leaks
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.classList.add('loading');

    const img = new Image();
    img.crossOrigin = "Anonymous";

    // Store cleanup function for potential cancellation
    const cleanup = () => {
        img.onload = null;
        img.onerror = null;
        img.src = '';
    };

    img.onload = function () {
        try {
            const scale = window.devicePixelRatio || 1;
            const contractScale = canvasId === 'contractCanvas' ? 0.33 : 0.25;

            // Set canvas dimensions
            canvas.width = 2480 * scale * contractScale;
            canvas.height = 3508 * scale * contractScale;

            // Reset context and apply scaling
            ctx.save();
            ctx.scale(scale * contractScale, scale * contractScale);
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, 2480, 3508);

            ctx.font = 'bold 18px Arial';
            ctx.fillStyle = '#000000';
            ctx.textAlign = 'left';

            const checkmark = '✔';
            const qrFrontData = userData.qrData?.idFrontImage || {};
            const qrBackData = userData.qrData?.idBackImage || {};

            if (canvasId === 'contractCanvas') {
                const { day, month, year } = getDateComponents(userData.registrationDate);
                ctx.fillText(day, 413, 313);
                ctx.fillText(month, 541, 311);
                ctx.fillText(year, 681, 311);
                ctx.fillText(qrFrontData.fullName || userData.fullName || '', 401, 359);
                ctx.fillText(qrFrontData.idNumber || userData.idNumber || '', 393, 415);
                ctx.fillText(userData.phoneNumber || '', 403, 513);
                ctx.fillText(userData.email || '', 405, 567);
                ctx.fillText(userData.loanAmount ? `${formatNumber(userData.loanAmount)} VND` : '', 409, 689);

                const purpose = userData.loanPurpose || '';
                if (purpose === 'Sửa chữa nhà') {
                    ctx.fillText(checkmark, 145, 835);
                } else if (purpose === 'Mua xe') {
                    ctx.fillText(checkmark, 385, 833);
                } else if (purpose === 'Học tập') {
                    ctx.fillText(checkmark, 145, 833);
                } else if (purpose) {
                    ctx.fillText(purpose, 505, 895);
                }

                const term = userData.loanTerm || '';
                if (term === '12') {
                    ctx.fillText(checkmark, 429, 1069);
                } else if (term === '24') {
                    ctx.fillText(checkmark, 541, 1067);
                } else if (term === '36') {
                    ctx.fillText(checkmark, 645, 1069);
                }

                ctx.fillText(userData.interestRate ? `${userData.interestRate}%` : '', 453, 1125);
                ctx.fillText(userData.accountNumber || '', 273, 1493);
                ctx.fillText(userData.loanCode || '', 1207, 413);
                ctx.fillText(userData.registrationDate || '', 1467, 411);
                ctx.fillText(userData.sellerCode || '', 1271, 451);
                ctx.fillText(userData.storeCode || '', 1517, 445);
                ctx.fillText(userData.staffName || '', 961, 1599);
                ctx.fillText(userData.branchName || '', 967, 1655);
                ctx.fillText(userData.staffCode || '', 1127, 1719);

                ctx.fillText(checkmark, 1569, 1807);
                ctx.fillText(checkmark, 1571, 1877);
                ctx.fillText(checkmark, 1569, 1917);
                ctx.fillText(checkmark, 1569, 1953);

                ctx.fillText(userData.loanAmount ? `${formatNumber(userData.loanAmount)} VND` : '', 1217, 2109);
                ctx.fillText(day, 1231, 2161);
                ctx.fillText(month, 1349, 2161);
                ctx.fillText(year, 1477, 2163);

                // Generate data URL and clean up immediately
                const dataUrl = canvas.toDataURL('image/png');
                userData.contractImageUrl = dataUrl;
                saveToLocalStorage();
            } else if (canvasId === 'disbursementCanvas') {
                ctx.fillText(userData.accountNumber || '', 931, 725);
                ctx.fillText(qrFrontData.fullName || userData.fullName || '', 953, 821);
                ctx.fillText(userData.bankName || '', 961, 889);
                ctx.fillText(qrFrontData.idNumber || userData.idNumber || '', 993, 1121);
                ctx.fillText(qrBackData.idIssueDate || userData.idIssueDate || '', 1661, 1121);
                ctx.fillText(qrBackData.idIssuePlace || userData.idIssuePlace || '', 2233, 1121);

                // Generate data URL and clean up immediately
                const dataUrl = canvas.toDataURL('image/png');
                userData.disbursementImageUrl = dataUrl;
                saveToLocalStorage();
            }

            // Restore context state
            ctx.restore();
            canvas.classList.remove('loading');

        } catch (error) {
            // Canvas rendering error occurred
            canvas.classList.remove('loading');
        } finally {
            // Clean up image object
            cleanup();
        }
    };

    img.onerror = function () {
        try {
            img.src = formData.fallbackImage;
        } catch (error) {
            // Image loading error occurred
            canvas.classList.remove('loading');
            cleanup();
        }
    };

    img.src = imageUrl;
}

// Download as PDF
function downloadAsPDF(canvas, filename) {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [2480, 3508]
    });
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, 2480, 3508);
    pdf.save(filename);
}