Shinhan Bank Consumer Loan Webpage
This project is the front-end for the Shinhan Bank consumer loan webpage, providing information about consumer loans with features like multilingual support, lazy loading, and a service worker for offline access.
Features

Consumer Loan Details: Information on loan benefits, required documents, and application process.
Multilingual Support: Vietnamese and English translations.
Offline Support: Service worker for caching assets.
Responsive Design: Mobile and desktop navigation.
Interactive Elements: Newsletter subscription, chat widget (AntBuddy), and modal popups.

Prerequisites

Node.js (v16+ recommended)
npm (v8+ recommended)

Installation

Clone the repository:git clone https://github.com/your-username/shinhan-bank-web.git


Navigate to the project directory:cd shinhan-bank-web


Install dependencies:npm install



Usage

Development: Start the development server with hot reloading.npm start


Production: Build the optimized assets.npm run build


Access: Open http://localhost:8080 (default) in your browser to view the webpage.

Project Structure

index.html: Main HTML file (consumer loan page).
public/: Static assets (images, CSS, JS).
src/: Source code (JavaScript, CSS, translations).
service-worker.js: Service worker for offline support.
translations.json: Multilingual translations.

Contributing
See CONTRIBUTING.md for guidelines on how to contribute.
License
This project is licensed under the ISC License. See LICENSE for details.
Contact
For support, contact Shinhan Bank at shinhanvietnam@shinhan.com or call 1900 1577.

├── assets/
│   ├── css/
│   │   ├── slick.eot
│   │   ├── slick.ttf
│   │   ├── custom.css
│   │   ├── loan-registration.css
│   │   ├── main.css
│   │   ├── shared.css
│   │   ├── slick-theme.min.css
│   │   └── slick.min.css
│   │   └── styles.css
│   ├── img/
│   │   ├── modals/
│   │   │   ├── callbackModal.png
│   │   │   └── contract.pdf
│   │   ├── 2-apple-icon-120x120.png
│   │   ├── Homepage-banner.jpg
│   │   ├── Proof-of-income-labor-contract-monthly.png
│   │   ├── SVFC_LOGO.png
│   │   ├── Valid-ID-Passport.png
│   │   ├── ajax-loader.gif
│   │   ├── android-icon-192x192.png
│   │   ├── anhhopdongvay.png
│   │   ├── apple-icon-114x114.png
│   │   ├── apple-icon-144x144.png
│   │   ├── apple-icon-152x152.png
│   │   ├── apple-icon-180x180.png
│   │   ├── apple-icon-57x57.png
│   │   ├── apple-icon-60x60.png
│   │   ├── apple-icon-72x72.png
│   │   ├── apple-icon-76x76.png
│   │   ├── brand.png
│   │   ├── close-gray.svg
│   │   ├── confirm-inactive-sprite.svg
│   │   ├── contract-seal.jpg
│   │   ├── contract_image.png
│   │   ├── customer_centric.png
│   │   ├── dieukiengiayngan.png
│   │   ├── disbursement_image.png
│   │   ├── favicon-32x32.png
│   │   ├── favicon2023.ico
│   │   ├── generateDisbursementUrl.png
│   │   ├── i_search2.png
│   │   ├── icon-collateral.svg
│   │   ├── icon-interest.svg
│   │   ├── icon-limit.svg
│   │   ├── icon-procedure.svg
│   │   ├── id.jpg
│   │   ├── loan-intro.mp4
│   │   ├── loan-profile-inactive-sprite.svg
│   │   ├── loan-video-poster.jpg
│   │   ├── new-loader.gif
│   │   ├── personal-info-inactive-sprite.jpg
│   │   ├── social.png
│   │   ├── sub-menu-ft.png
│   │   └── success.svg
│   └── js/
│       ├── bootstrap.bundle.min.js
│       ├── chatbot.js
│       ├── client_secrets.json
│       ├── custom.js
│       ├── ekyc-mock.js
│       ├── face-api.min.js
│       ├── form.js
│       ├── index.js
│       ├── jquery.min.js
│       ├── jspdf.umd.min.js
│       ├── loan-registration.js
│       ├── main.js
│       ├── main.min.js
│       ├── opencv.js
│       ├── router.js
│       ├── scripts.js
│       ├── serviceAccountKey.json
│       ├── shared.js
│       ├── slick.min.js
│       ├── slider.js
│       └── tesseract.min.js
├── dist/
│   ├── configs/
│   └── lib/
├── ekyc-mock/
│   └── models/
│       ├── face_expression_model-shard1
│       ├── face_expression_model-weights_manifest.json
│       ├── face_landmark_68_model-shard1
│       ├── face_landmark_68_model-weights_manifest.json
│       ├── face_recognition_model-shard1
│       ├── face_recognition_model-shard2
│       ├── face_recognition_model-weights_manifest.json
│       ├── tiny_face_detector_model-shard1
│       └── tiny_face_detector_model-weights_manifest.json
├── lib/
│   ├── VNPTBrowserSDKAppV4.0.0.js
│   ├── VNPTQRBrowserApp.js
│   ├── VNPTQRUpload.js
│   ├── bg-vnpt.svg
│   ├── english-tutorial.mp4
│   ├── mobile-oval.json
│   ├── vietnamese-tutorial.mp4
│   └── web-oval.json
├── models/
│   ├── face_expression_model-shard1
│   ├── face_expression_model-weights_manifest.json
│   ├── face_landmark_68_model-shard1
│   ├── face_landmark_68_model-weights_manifest.json
│   ├── face_recognition_model-shard1
│   ├── face_recognition_model-shard2
│   ├── face_recognition_model-weights_manifest.json
│   ├── tiny_face_detector_model-shard1
│   └── tiny_face_detector_model-weights_manifest.json
├── pages/
│   └── vi/
│       ├── about/
│       │   ├── about-shinhan-financial-group.html
│       │   └── about-shinhan-way.html
│       │   └── about-vision-mission.html
│       ├── configs/
│       │   ├── android/
│       │   │   └── config_sdk.xml
│       │   ├── assets/
│       │   │   ├── bg-vnpt.svg
│       │   │   ├── english-tutorial.mp4
│       │   │   ├── favicon.png
│       │   │   ├── mobile-oval.json
│       │   │   └── vietnamese-tutorial.mp4
│       │   ├── ios/
│       │   │   └── SelectVersionViewController.swift
│       │   ├── shared/
│       │   │   └── shared.css
│       │   └── web/
│       │       └── config.js
│       ├── corporate/
│       │   └── doanh-nghiep-fdi.html
│       ├── general/
│       │   ├── chuong-trinh-hop-tac.html
│       │   ├── mau-don.html
│       │   ├── private-wealth-management-vi.html
│       │   ├── san-pham-the.html
│       │   ├── tai-khoan-tien-gui.html
│       │   └── tham-chieu.html
│       ├── personal/
│       │   ├── duong-day-nong.html
│       │   ├── loan-calc-modal.html
│       │   ├── register-modal.html
│       │   ├── tra-no-khoan-vay-the-chap-bat-dong-san-tai-ngan-hang-khac.html
│       │   ├── vay-mua-nha.html
│       │   ├── vay-mua-xe-da-qua-su-dung.html
│       │   ├── vay-mua-xe.html
│       │   ├── vay-tieu-dung-bao-lanh.html
│       │   ├── vay-tieu-dung-truc-tuyen.html
│       │   └── vay-tieu-dung.html
│       ├── soho/
│       │   └── the-7.html
│       ├── Evaluate-conditions.html
│       ├── about-awards.html
│       ├── about-shinhan-financial-group.html
│       ├── atm.html
│       ├── branches.html
│       ├── ca-nhan.html
│       ├── check_result.html
│       ├── chi-nhanh-gan-nhat.html
│       ├── chuyen-tien.html
│       ├── contact.html
│       ├── contract.html
│       ├── credit-card-application.html
│       ├── dieu-khoan-su-dung.html
│       ├── dieukiengiayngan.html
│       ├── disbursement.html
│       ├── doanh-nghiep.html
│       ├── financial-statement.html
│       ├── gioi-thieu.html
│       ├── global-shinhan.html
│       ├── ho-kinh-doanh-sme.html
│       ├── hopdongvay.html
│       ├── la-suat-shinhanbank
│       ├── lai-suat-tien-gui.html
│       ├── lai-suat-vay.html
│       ├── loan-calculator.html
│       ├── loan_calculator.html
│       ├── loan_registration.html
│       ├── mau-don.html
│       ├── momo.html
│       ├── otp.html
│       ├── personal-applyonline.html
│       ├── personal-personalloan-calculator.html
│       ├── remittance.html
│       ├── shinhan-pwm.html
│       ├── step1.html
│       ├── step2.html
│       ├── step3.html
│       ├── step4.html
│       ├── step5.html
│       ├── step6.html
│       ├── step7.html
│       ├── step8.html
│       ├── step9.html
│       ├── support-center.html
│       ├── tham-chieu.html
│       ├── the.html
│       ├── trang-chu.html
│       ├── visa.html
│       └── zalopay.html
├── public/
│   ├── documents/
│   │   ├── contract.pdf
│   │   ├── corporate_tariff_vi.pdf
│   │   ├── deposit_interest_vi.pdf
│   │   └── disbursement.pdf
│   ├── js/
│   │   ├── configs/
│   │   │   ├── android/
│   │   │   │   └── config_sdk.xml
│   │   │   ├── iOS/
│   │   │   │   └── SelectVersionViewController.swift
│   │   │   ├── logo.png
│   │   │   ├── config.js
│   │   │   ├── step2.js
│   │   │   ├── step3.js
│   │   │   └── web-sdk-version-3.0.js
│   └── themes/
│       └── shinhan/
│           └── img/
│               └── icon-calculator.png
├── server/
│   └── index.js
├── src/
│   ├── app/
│   │   └── abc/
│   │       ├── abc.comComponent.html
│   │       └── abc.comComponent.ts
│   └── assets/
│       ├── sdk-ekyc/
│       ├── comComponents/
│       └── translations/
├── tests/
│   └── form.test.js
├── web-sdk-version-3.2.0.0/
│   ├── dist/
│   │   ├── assets/
│   │   └── lib/
│   │       ├── VNPTBrowserSDKAppV2.3.3.js
│   │       └── VstvoCBvhbc22NJilLQUsI5WC0wDmc8K8cecW-wGYYJOZuhqXVK7I8eIhxBetC9aN2d3Q-AzN-rOPUQJbksPKQ==
│   │       ├── animation.json
│   │       ├── css2?family=Open+Sans:wght@300;400;500;600;700&display=swap
│   │       ├── ekyc-web-sdk-2.1.4.7.js
│   │       ├── face-api.min.js
│   │       ├── index.html
│   │       ├── index2.html
│   │       ├── index3.html
│   │       ├── jquery-3.6.0.min.js
│   │       ├── js?id=UA-175343250-1
│   │       ├── jsQR.js
│   │       ├── lottie.min.js
│   │       ├── main-es2015.73eeebfd2aa6f3da1a29.js
│   │       ├── main-es5.73eeebfd2aa6f3da1a29.js
│   │       ├── polyfills-es2015.c40805d07191d74ba0a7.js
│   │       ├── polyfills-es5.bc04c5e468ed27c65eb2.js
│   │       ├── popper.min.js
│   │       ├── runtime-es2015.1480c209bd7e17546df7.js
│   │       ├── runtime-es5.1480c209bd7e17546df7.js
│   │       ├── scripts.d6f9b7ba4f64aa12f244.js
│   │       ├── server.js
│   │       ├── styles.b0cc851127f97e8be4dc.css
│   │       ├── web-sdk-version-3.1.0.0.js
│   │       └── web-sdk-version-3.1.0.0.js.LICENSE.txt
│   │       ├── web-sdk-version-3.2.0.0.js
│   │       └── web-sdk-version-3.2.0.0.js.LICENSE.txt
├── .gitignore
├── .nojekyll
├── CNAME
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── SECURITY.md
├── credentials.json
├── favicon.ico
├── gmail_test.py
├── index.html
├── package-lock.json
├── package.json
├── register.html
├── send-email.js
└── service-worker.js
