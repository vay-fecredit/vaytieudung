# BÁO CÁO KIỂM TRA CHI TIẾT CÁC TỆP HTML

## Tổng quan
Báo cáo này liệt kê tất cả các lỗi được phát hiện trong quá trình rà soát các tệp HTML và phương án sửa chữa cho từng lỗi.

---

## 1. Evaluate-conditions.html

### ✅ Điểm tốt:
- Đã có đầy đủ CSS bundles từ index.html
- Cấu trúc subheader, header, footer đúng với index.html
- Main content có `id="site-content"` và `tabindex="-1"`

### ⚠️ Lỗi phát hiện:

#### Lỗi 1: Indentation không nhất quán
**Vị trí:** Dòng 693, 700, 727, 732, 737, 756
**Mô tả:** Một số thẻ đóng có indentation không đúng, gây khó đọc code
**Mức độ:** Thấp (không ảnh hưởng chức năng)

**Phương án sửa:**
```html
<!-- Trước -->
        </div>
                            <button id="search-button" type="submit" role="button"
                                    aria-label=""
                                    class="btn base-btn-bg base-btn-bg-solid base-btn-bg-hover-solid base-btn-text base-btn-borders btn-search">
                                <span></span>
                                <i aria-hidden="true" class="icon ti ti-search"></i>
                                <p>Tìm kiếm</p>
        </button>

<!-- Sau -->
                            <button id="search-button" type="submit" role="button"
                                    aria-label=""
                                    class="btn base-btn-bg base-btn-bg-solid base-btn-bg-hover-solid base-btn-text base-btn-borders btn-search">
                                <span></span>
                                <i aria-hidden="true" class="icon ti ti-search"></i>
                                <p>Tìm kiếm</p>
                            </button>
```

---

## 2. atm.html

### ⚠️ Lỗi phát hiện:

#### Lỗi 1: Thiếu thẻ đóng `</div>` cho `#site`
**Vị trí:** Trước `</body>` (dòng 1301)
**Mô tả:** File có `<div id="site">` ở dòng 800 nhưng thiếu thẻ đóng `</div>` trước `</body>`
**Mức độ:** Cao (gây lỗi cấu trúc HTML)

**Phương án sửa:**
```html
    </script>
    </div> <!-- Đóng #site -->
</body>
</html>
```

#### Lỗi 2: Footer có ID sai và thiếu structure đúng
**Vị trí:** Dòng 1043-1052
**Mô tả:** 
- Footer có `id="footer"` thay vì `id="site-footer"`
- Footer thiếu class `footer-bg footer-bg-solid bg-gray-1` và `tabindex="-1"`
- Footer thiếu structure đầy đủ như index.html (chỉ có nội dung đơn giản)
**Mức độ:** Cao (ảnh hưởng đến styling và cấu trúc)

**Phương án sửa:**
- Thay thế toàn bộ footer bằng footer structure từ index.html (giống như đã làm trong Evaluate-conditions.html)
- Đảm bảo có `id="site-footer"` và các class đúng

#### Lỗi 3: Header thiếu class và cấu trúc không đúng
**Vị trí:** Dòng 844-865
**Mô tả:** 
- Header thiếu class `header-bg header-bg-solid` và `tabindex="-1"`
- Cấu trúc header không đúng với index.html (thiếu `row justify-content-between`)
- Navigation structure không đúng (thiếu `nav__list` và các class cần thiết)
- Link trong nav trỏ đến `#footer` thay vì `#site-footer`

**Mức độ:** Cao (ảnh hưởng đến styling và cấu trúc)

**Phương án sửa:**
```html
<!-- Thay thế từ dòng 844-865 -->
<header id="site-header" class="header-bg header-bg-solid" tabindex="-1">
    <div class="container">
        <div class="row justify-content-between">
            <div class="d-flex align-items-center nav-left">
                <div id="logo">
                    <a href="../index.html" title="FE CREDIT - VAY TIÊU DÙNG TÍN CHẤP" class="w-100">
                        <img src="https://www-cdn.fecredit.com.vn/media/20ymppzv/fec-logo.svg" alt="FE CREDIT Logo"
                             style="object-fit: contain;width:100%">
                        <span>FE CREDIT - VAY TIÊU DÙNG TÍN CHẤP</span>
                    </a>
                </div>
                <!-- Main navigation -->
                <nav aria-label="" id="nav-menu"
                     class="main nav__menu nav-dropdown align-items-center navigation-dropdown-bg navigation-dropdown-bg-solid">
                    <ul class="nav__list">
                        <li class="no-child">
                            <span>
                                <a class="nav__link d-flex align-items-center justify-content-start text-nowrap" href="../index.html">Trang Chủ</a>
                            </span>
                        </li>
                        <li class="no-child">
                            <span>
                                <a class="nav__link d-flex align-items-center justify-content-start text-nowrap" href="Evaluate-conditions.html">Đăng Ký Giải Ngân</a>
                            </span>
                        </li>
                        <li class="no-child">
                            <span>
                                <a class="nav__link d-flex align-items-center justify-content-start text-nowrap" href="#site-footer">Liên Hệ</a>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</header>
```

#### Lỗi 2: Footer có ID sai và thiếu structure đúng
**Vị trí:** Dòng 1043-1052
**Mô tả:** 
- Footer có `id="footer"` thay vì `id="site-footer"`
- Footer thiếu class `footer-bg footer-bg-solid bg-gray-1` và `tabindex="-1"`
- Footer thiếu structure đầy đủ như index.html
**Mức độ:** Cao (ảnh hưởng đến styling và cấu trúc)

**Phương án sửa:**
- Thay thế toàn bộ footer bằng footer structure từ index.html

---

## 3. visa.html

### ✅ Điểm tốt:
- Đã có đầy đủ CSS bundles
- Cấu trúc subheader, header, footer đúng
- Main content có `id="site-content"` và `tabindex="-1"`

### ⚠️ Lỗi phát hiện:

#### Lỗi 1: Có phần footer cũ còn sót lại
**Vị trí:** Dòng 1270-1274
**Mô tả:** 
- Footer mới đã được thêm ở dòng 1187 với `id="site-footer"` và đóng ở dòng 1268
- Thẻ đóng `</div>` cho `#site` ở dòng 1269 là đúng
- Nhưng sau đó còn có phần footer cũ (chỉ có `<p>` và `</footer>`) ở dòng 1270-1274
**Mức độ:** Cao (gây lỗi cấu trúc HTML)

**Phương án sửa:**
```html
        </footer>
    </div> <!-- Đóng #site - dòng 1269 -->
    <!-- XÓA từ dòng 1270-1274 -->
    <!-- <p>Địa chỉ: ...</p> -->
    <!-- </footer> -->
    
    <script>
```

---

## 4. otp.html

### ⚠️ Lỗi phát hiện:

#### Lỗi 1: Có 2 thẻ `</main>` (duplicate closing tag)
**Vị trí:** Dòng 458 và dòng 517
**Mô tả:** Có 2 thẻ đóng `</main>` trong file, một ở dòng 458 (sau error modal) và một ở dòng 517 (sau footer)
**Mức độ:** Cao (gây lỗi cấu trúc HTML)

**Phương án sửa:**
- Xóa thẻ `</main>` ở dòng 458
- Giữ lại thẻ `</main>` ở dòng 517 (trước footer)
- Di chuyển error modal và gemini modal vào trong `<main>` hoặc ra ngoài nhưng trước `</main>` cuối cùng

**Cấu trúc đúng:**
```html
<main id="site-content" tabindex="-1">
    <!-- Nội dung chính -->
    
    <!-- Error Modal -->
    <div id="errorModal">...</div>
    
    <!-- Gemini Modal -->
    <div id="gemini-modal">...</div>
</main>
<footer>...</footer>
```

#### Lỗi 2: Header cũ vẫn còn (không cần thiết)
**Vị trí:** Dòng 256
**Mô tả:** Header cũ với `style="display: none;"` vẫn còn trong code
**Mức độ:** Thấp (không ảnh hưởng nhưng làm code dài)

**Phương án sửa:**
- Xóa toàn bộ header cũ từ dòng 256 đến dòng 256 (hoặc tìm và xóa phần header cũ)

---

## 5. step4.html

### ⚠️ Lỗi phát hiện:

#### Lỗi 1: Subheader thiếu class đúng
**Vị trí:** Dòng 1702
**Mô tả:** Subheader thiếu các class: `secondary nav-dropdown navigation-dropdown-bg navigation-dropdown-bg-solid`
**Mức độ:** Trung bình (ảnh hưởng styling)

**Phương án sửa:**
```html
<!-- Trước -->
<nav class="sub-header-nav" aria-label="Sub Navigation">

<!-- Sau -->
<nav aria-label="" class="sub-header-nav secondary nav-dropdown navigation-dropdown-bg navigation-dropdown-bg-solid">
```

#### Lỗi 2: Subheader thiếu search form
**Vị trí:** Dòng 1708-1711
**Mô tả:** Search form đơn giản, không đúng với index.html
**Mức độ:** Trung bình

**Phương án sửa:**
```html
<!-- Thay thế search form đơn giản bằng form đầy đủ từ index.html -->
<div class="form site-search-form site-search" aria-label="">
    <form role="search" autocomplete="off" form-group="off" action="https://www.fecredit.com.vn/search/" method="get" name="searchForm">
        <div class="form-group">
            <input type="text" class="myInput form-control" name="search_field"
                   aria-label="" placeholder="Bạn cần tìm gì?"
                   value="">
        </div>
        <button id="search-button" type="submit" role="button"
                aria-label=""
                class="btn base-btn-bg base-btn-bg-solid base-btn-bg-hover-solid base-btn-text base-btn-borders btn-search">
            <span></span>
            <i aria-hidden="true" class="icon ti ti-search"></i>
            <p>Tìm kiếm</p>
        </button>
    </form>
</div>
```

#### Lỗi 3: Header thiếu class và cấu trúc không đúng
**Vị trí:** Dòng 1717-1738
**Mô tả:** 
- Header thiếu class `header-bg header-bg-solid` và `tabindex="-1"`
- Cấu trúc không đúng với index.html
- Link trỏ đến `#footer` thay vì `#site-footer`

**Mức độ:** Cao

**Phương án sửa:**
```html
<header id="site-header" class="header-bg header-bg-solid" tabindex="-1">
    <div class="container">
        <div class="row justify-content-between">
            <div class="d-flex align-items-center nav-left">
                <div id="logo">
                    <a href="../index.html" title="FE CREDIT - VAY TIÊU DÙNG TÍN CHẤP" class="w-100">
                        <img src="https://www-cdn.fecredit.com.vn/media/20ymppzv/fec-logo.svg" alt="FE CREDIT Logo"
                             style="object-fit: contain;width:100%">
                        <span>FE CREDIT - VAY TIÊU DÙNG TÍN CHẤP</span>
                    </a>
                </div>
                <!-- Main navigation -->
                <nav aria-label="" id="nav-menu"
                     class="main nav__menu nav-dropdown align-items-center navigation-dropdown-bg navigation-dropdown-bg-solid">
                    <ul class="nav__list">
                        <li class="no-child">
                            <span>
                                <a class="nav__link d-flex align-items-center justify-content-start text-nowrap" href="../index.html">Trang Chủ</a>
                            </span>
                        </li>
                        <li class="no-child">
                            <span>
                                <a class="nav__link d-flex align-items-center justify-content-start text-nowrap" href="loan_registration.html">Đăng Ký Vay</a>
                            </span>
                        </li>
                        <li class="no-child">
                            <span>
                                <a class="nav__link d-flex align-items-center justify-content-start text-nowrap" href="#site-footer">Liên Hệ</a>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</header>
```

#### Lỗi 4: Main content thiếu `tabindex="-1"`
**Vị trí:** Dòng 1741
**Mô tả:** Main content có `id="site-content"` nhưng thiếu `tabindex="-1"`
**Mức độ:** Thấp

**Phương án sửa:**
```html
<main id="site-content" tabindex="-1">
```

#### Lỗi 5: Footer có ID sai và thiếu structure đúng
**Vị trí:** Dòng 2325
**Mô tả:** 
- Footer có `id="footer"` thay vì `id="site-footer"`
- Footer thiếu class `footer-bg footer-bg-solid bg-gray-1` và `tabindex="-1"`
- Footer thiếu structure đầy đủ như index.html (chỉ có nội dung đơn giản)
**Mức độ:** Cao (ảnh hưởng đến styling và cấu trúc)

**Phương án sửa:**
- Thay thế toàn bộ footer bằng footer structure từ index.html (giống như đã làm trong Evaluate-conditions.html)
- Đảm bảo có `id="site-footer"` và các class đúng

---

## 6. step5.html

### ⚠️ Lỗi phát hiện:

#### Lỗi 1-5: Tương tự như step4.html
**Vị trí:** Tương ứng với step4.html
**Mô tả:** Các lỗi giống như step4.html
**Mức độ:** Tương tự

**Phương án sửa:** Áp dụng các sửa chữa tương tự như step4.html

---

## 7. step6.html

### ⚠️ Lỗi phát hiện:

#### Lỗi 1-5: Tương tự như step4.html
**Vị trí:** Tương ứng với step4.html
**Mô tả:** Các lỗi giống như step4.html
**Mức độ:** Tương tự

**Phương án sửa:** Áp dụng các sửa chữa tương tự như step4.html

---

## 8. step7.html

### ⚠️ Lỗi phát hiện:

#### Lỗi 1-5: Tương tự như step4.html
**Vị trí:** Tương ứng với step4.html
**Mô tả:** Các lỗi giống như step4.html
**Mức độ:** Tương tự

**Phương án sửa:** Áp dụng các sửa chữa tương tự như step4.html

---

## 9. step8.html

### ⚠️ Lỗi phát hiện:

#### Lỗi 1-5: Tương tự như step4.html
**Vị trí:** Tương ứng với step4.html
**Mô tả:** Các lỗi giống như step4.html
**Mức độ:** Tương tự

**Phương án sửa:** Áp dụng các sửa chữa tương tự như step4.html

---

## Tổng kết

### Thống kê lỗi:

#### Theo mức độ:
- **Lỗi cao (10 lỗi):** 
  - atm.html: footer ID sai và structure (1), header structure sai (1) = **2 lỗi**
  - otp.html: duplicate main tag (1) = **1 lỗi**
  - visa.html: footer cũ còn sót lại (1) = **1 lỗi**
  - step4-8.html: footer ID sai và structure (5), header thiếu class và structure (5) = **10 lỗi**
  
- **Lỗi trung bình (15 lỗi):** 
  - step4-8.html: subheader thiếu class và search form (5 files) = **5 lỗi**
  - step4-8.html: main thiếu tabindex (5 files) = **5 lỗi**
  - step4-8.html: links trỏ đến `#footer` thay vì `#site-footer` (5 files) = **5 lỗi**
  
- **Lỗi thấp (3 lỗi):** 
  - Evaluate-conditions.html: indentation không nhất quán (1)
  - otp.html: header cũ còn sót lại (1)
  - Cleanup code (1)

**Tổng cộng: 28 lỗi** (10 cao + 15 trung bình + 3 thấp)

#### Theo file:
- **Evaluate-conditions.html:** 1 lỗi thấp
- **atm.html:** 3 lỗi cao (footer ID + structure, header structure)
- **visa.html:** 1 lỗi cao (footer cũ còn sót)
- **otp.html:** 2 lỗi (1 cao: duplicate main, 1 thấp: header cũ)
- **step4.html:** 4 lỗi (2 cao: footer + header, 2 trung bình: subheader + main + links)
- **step5.html:** 4 lỗi (tương tự step4)
- **step6.html:** 4 lỗi (tương tự step4)
- **step7.html:** 4 lỗi (tương tự step4)
- **step8.html:** 4 lỗi (tương tự step4)

### Ưu tiên sửa:

#### 1. **Ưu tiên cao (phải sửa ngay - 10 lỗi):**
   - **otp.html:** Xóa duplicate `</main>` tag (dòng 458) - **LỖI NGHIÊM TRỌNG**
   - **visa.html:** Xóa phần footer cũ còn sót lại (dòng 1270-1274) - **LỖI NGHIÊM TRỌNG**
   - **atm.html:** 
     - Sửa footer ID từ `footer` thành `site-footer` và cập nhật structure đầy đủ
     - Sửa header structure với class và cấu trúc đúng
   - **step4-8.html (5 files):**
     - Sửa footer ID từ `footer` thành `site-footer` và cập nhật structure đầy đủ
     - Sửa header với class `header-bg header-bg-solid`, `tabindex="-1"` và cấu trúc đúng

#### 2. **Ưu tiên trung bình (15 lỗi):**
   - **step4-8.html (5 files):**
     - Cập nhật subheader với class `secondary nav-dropdown navigation-dropdown-bg navigation-dropdown-bg-solid`
     - Thêm search form đầy đủ như index.html
     - Thêm `tabindex="-1"` cho main content
     - Sửa tất cả links từ `#footer` thành `#site-footer`

#### 3. **Ưu tiên thấp (3 lỗi):**
   - **Evaluate-conditions.html:** Sửa indentation cho code dễ đọc
   - **otp.html:** Xóa header cũ (display: none)
   - Cleanup code không cần thiết

### Lưu ý:
- Tất cả các file cần đảm bảo có đầy đủ CSS bundles từ index.html
- Tất cả các file cần có cấu trúc HTML đúng với index.html
- Kiểm tra lại tất cả các link internal (đảm bảo trỏ đến `#site-footer` thay vì `#footer`)
- Đảm bảo tất cả các thẻ đóng đúng và đầy đủ

