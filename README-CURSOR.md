# 🏦 Shinhan Bank eKYC - Cursor VSCode Setup

## 📋 Hướng dẫn mở project trong Cursor VSCode

### 🚀 Cách 1: Mở Workspace File (Khuyến nghị)
1. Mở Cursor VSCode
2. File → Open Workspace from File
3. Chọn file `shinhanbank.code-workspace`
4. Project sẽ được mở với tất cả cấu hình tối ưu

### 🚀 Cách 2: Mở thư mục trực tiếp
1. Mở Cursor VSCode
2. File → Open Folder
3. Chọn thư mục workspace
4. Cursor sẽ tự động load các cấu hình từ `.vscode/`

## 🛠️ Tính năng đã được cấu hình

### 📁 File Structure
```
workspace/
├── .vscode/                    # Cấu hình VSCode
│   ├── settings.json          # Cài đặt editor
│   ├── extensions.json        # Extensions khuyến nghị
│   ├── launch.json           # Debug configurations
│   └── tasks.json            # Build tasks
├── shinhanbank.code-workspace # Workspace file
├── pages/vi/                  # Các trang HTML
├── public/js/                 # JavaScript files
├── assets/js/                 # Asset JavaScript
└── README-CURSOR.md          # File này
```

### 🎯 Extensions được khuyến nghị
- **Live Server**: Chạy local server
- **Prettier**: Format code tự động
- **ESLint**: Lint JavaScript
- **Auto Rename Tag**: Tự động đổi tên HTML tags
- **HTML CSS Support**: Hỗ trợ CSS trong HTML
- **JavaScript Booster**: Tăng cường JavaScript

### 🚀 Tasks có sẵn
1. **Start Live Server**: Chạy server local trên port 3000
2. **Format All Files**: Format toàn bộ code
3. **Lint JavaScript Files**: Kiểm tra lỗi JavaScript
4. **Open Test Steps**: Mở trang test steps

### 🐛 Debug Configurations
- **Chrome**: Debug với Chrome browser
- **Firefox**: Debug với Firefox browser  
- **Edge**: Debug với Microsoft Edge

## 🔧 Cách sử dụng

### 1. Khởi động Live Server
- Nhấn `Ctrl+Shift+P` (Windows/Linux) hoặc `Cmd+Shift+P` (Mac)
- Gõ "Tasks: Run Task"
- Chọn "Start Live Server"
- Browser sẽ tự động mở `http://localhost:3000`

### 2. Debug JavaScript
- Đặt breakpoint trong file JavaScript
- Nhấn `F5` hoặc chọn "Run and Debug"
- Chọn "Launch Chrome - Local Development"

### 3. Format Code
- Nhấn `Shift+Alt+F` để format file hiện tại
- Hoặc chạy task "Format All Files" để format toàn bộ project

## 📱 Test eKYC Flow

### Các bước test:
1. **Step 1**: Nhập thông tin cá nhân (`pages/vi/step1.html`)
2. **Step 2**: Chụp ảnh giấy tờ (`pages/vi/step2.html`) 
3. **Step 3**: Xác thực khuôn mặt (`pages/vi/step3.html`)
4. **Step 4-8**: Các bước tiếp theo

### 🧪 Test Steps Page
Mở `test-steps.html` để có overview toàn bộ flow và test từng bước.

## 🐛 Bugs đã được fix

### ✅ Bug 1: Import Path Error
- **File**: `public/js/step2.js`
- **Issue**: Import từ file không tồn tại
- **Fix**: Sửa import path và thêm fallback config

### ✅ Bug 2: localStorage Data Inconsistency  
- **File**: `public/js/step3.js`
- **Issue**: Sai key localStorage
- **Fix**: Sửa key từ `ekycData.frontImageHash` thành `frontImageHash`

### ✅ Bug 3: XSS Vulnerability
- **File**: `assets/js/form.js`
- **Issue**: Sử dụng `innerHTML` không an toàn
- **Fix**: Thay bằng `textContent`

## 🎨 Mobile-First Design

Project đã được tối ưu cho mobile với:
- Responsive design
- Touch-friendly UI
- Optimized loading
- Fixed layout components
- Performance optimizations

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra console browser (F12)
2. Xem Network tab để debug API calls
3. Sử dụng debugger trong Cursor
4. Check localStorage data

---
**Happy Coding! 🚀**