# Cải Tiến Step 6 và Step 7 - Tài Liệu Kỹ Thuật

## Tổng Quan

Đã cải tiến hai trang `step6.html` (Xem Hợp Đồng) và `step7.html` (Điều Kiện Giải Ngân) với các tính năng mới:

1. **Chế độ Test Mode** - Tự động tạo dữ liệu giả khi không có dữ liệu trong localStorage
2. **Cải tiến UX** - Thêm loading indicators và feedback rõ ràng hơn
3. **Xử lý lỗi tốt hơn** - Try-catch blocks với thông báo lỗi chi tiết

## Chi Tiết Cải Tiến

### 1. CHẾ ĐỘ TEST MODE

#### Tính năng:
- Tự động phát hiện khi không có dữ liệu trong localStorage
- Tạo dữ liệu giả (Mock Data) để test
- Hiển thị banner cảnh báo "Đang chạy chế độ kiểm thử (Test Mode)"

#### Dữ liệu Mock:
```javascript
{
  isRegistered: true,
  fullName: "Khách Hàng Test",
  cccd: "001234567890",
  phone: "0901234567",
  email: "test@example.com",
  loanAmount: 50000000,
  loanPurpose: "Vay tiêu dùng",
  loanTerm: 12,
  interestRate: 18,
  accountNumber: "1234567890",
  disbursementDate: <ngày hiện tại>,
  loanCode: "TEST-001",
  currentStep: 6 hoặc 7,
  isContractDownloaded: false,
  isDisbursementDownloaded: false
}
```

#### Kích hoạt Test Mode:
- Khi localStorage rỗng
- Khi giải mã thất bại
- Khi dữ liệu không hợp lệ

### 2. CẢI TIẾN UX

#### Loading Indicators:

**Trên Canvas:**
- Overlay với spinner và text "Đang tải hợp đồng..." / "Đang tải điều kiện giải ngân..."
- Hiển thị trong lúc tải hình ảnh từ server
- Tự động ẩn khi tải xong

**Trên Nút "TẢI XUỐNG":**
- Hiển thị spinner nhỏ khi đang tạo PDF
- Text thay đổi thành "ĐANG TẢI..."
- Disable button trong lúc xử lý
- Khôi phục trạng thái ban đầu sau khi hoàn tất

#### CSS Classes mới:
```css
.test-mode-banner       - Banner cảnh báo Test Mode
.canvas-loading-overlay - Overlay loading trên canvas
.spinner                - Spinner lớn cho canvas
.spinner-small          - Spinner nhỏ cho button
```

### 3. XỬ LÝ LỖI

#### Try-Catch Blocks:
- Bao quanh tất cả operations quan trọng
- Logging chi tiết vào console
- Thông báo lỗi rõ ràng cho người dùng

#### Error Messages:
- Hiển thị error.message cụ thể
- Khôi phục UI state khi có lỗi
- Hướng dẫn người dùng cách khắc phục

### 4. LOGIC CHỨC NĂNG

#### Step 6 (Hợp Đồng Vay):
- Load userData từ localStorage hoặc tạo mock data
- Render canvas với hợp đồng
- Enable nút TẢI XUỐNG khi canvas sẵn sàng
- Enable nút TIẾP TỤC sau khi tải PDF
- Chuyển sang step7.html khi nhấn TIẾP TỤC

#### Step 7 (Điều Kiện Giải Ngân):
- Load userData từ localStorage hoặc tạo mock data
- Render canvas với điều kiện giải ngân
- Enable nút TẢI XUỐNG khi canvas sẵn sàng
- Enable nút TIẾP TỤC sau khi tải PDF
- Chuyển sang step8.html khi nhấn TIẾP TỤC

## Cách Sử Dụng

### Test Mode:
1. Truy cập trực tiếp vào `step6.html` hoặc `step7.html`
2. Trang sẽ tự động tạo dữ liệu test
3. Thấy banner vàng "Đang chạy chế độ kiểm thử"
4. Có thể test tất cả chức năng bình thường

### Production Mode:
1. Đi qua flow từ step1
2. Dữ liệu lưu vào localStorage
3. Không có test mode banner
4. Dữ liệu thật hiển thị trên canvas

## Kiểm Tra

### Validation Script:
```bash
node /tmp/validate-improvements.js
```

Kiểm tra:
- ✓ Test Mode Banner CSS class
- ✓ createMockData function
- ✓ showTestModeBanner function
- ✓ isTestMode variable
- ✓ Canvas loading overlay
- ✓ Loading spinner
- ✓ Small spinner for button
- ✓ showCanvasLoading function
- ✓ hideCanvasLoading function
- ✓ Try-catch in PDF download with loading
- ✓ Detailed error messages
- ✓ Test mode activation in loadUserData

## Tương Thích

- ✓ Tương thích ngược với code cũ
- ✓ Không ảnh hưởng đến flow hiện tại
- ✓ Test mode chỉ kích hoạt khi cần
- ✓ Production mode hoạt động như cũ

## Bảo Trì

### Để tắt Test Mode:
Không thể tắt hoàn toàn, nhưng có thể thay đổi điều kiện kích hoạt trong function `loadUserData()`.

### Để thay đổi Mock Data:
Chỉnh sửa function `createMockData()` trong mỗi file.

### Để customize loading messages:
Tìm và sửa trong:
- Canvas overlay: "Đang tải hợp đồng..." / "Đang tải điều kiện giải ngân..."
- Button: "ĐANG TẢI..."
- Test banner: "Đang chạy chế độ kiểm thử (Test Mode)"

## Files Đã Thay Đổi

1. `pages/step6.html` - 177 dòng thêm/sửa
2. `pages/step7.html` - 175 dòng thêm/sửa

Tổng cộng: 321 insertions(+), 31 deletions(-)

## Ghi Chú Kỹ Thuật

### Code Duplication
- Một số CSS và JavaScript được duplicate giữa step6 và step7
- Đây là thiết kế có chủ đích để mỗi trang độc lập, dễ maintain
- Trong tương lai có thể extract ra shared utility nếu cần

### Test Mode Security
- Test Mode không lưu dữ liệu vào localStorage
- Điều này được thiết kế để tránh ghi đè dữ liệu thật khi test
- Production mode vẫn lưu dữ liệu bình thường

### Encryption Key
- Encryption key được sử dụng giống với code hiện tại
- Không thay đổi để đảm bảo tương thích với dữ liệu đã lưu
