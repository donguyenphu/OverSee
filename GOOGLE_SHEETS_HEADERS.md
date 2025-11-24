# Google Sheets Column Headers (Tên cột cho Google Sheets)

## HƯỚNG DẪN SỬ DỤNG:
1. Mở Google Sheets của bạn
2. Copy dòng tên cột bên dưới (tùy theo sheet)
3. Paste vào **hàng đầu tiên** của sheet
4. Dữ liệu từ form sẽ tự động điền vào đúng cột

---

## 📝 STUDENT SHEET - IELTS Form

```
Timestamp	Loại môn đăng ký	Họ và tên	Số điện thoại	Email	Trường	Lớp	Nguyện vọng thêm	Khung giờ tiện trao đổi	Lịch thi dự kiến	Reading	Writing	Listening	Speaking	Overall	Mock Test
```

**Số cột: 16**

---

## 📝 STUDENT SHEET - SAT Form

```
Timestamp	Loại môn đăng ký	Họ và tên	Số điện thoại	Email	Trường	Lớp	Nguyện vọng thêm	Khung giờ tiện trao đổi	Lịch thi dự kiến	Điểm hiện tại	Reading & Writing	Math	Mock Test
```

**Số cột: 14**

---

## 📝 STUDENT SHEET - VN Form

```
Timestamp	Loại môn đăng ký	Họ và tên	Số điện thoại	Email	Facebook	Trường	Lớp	Nguyện vọng thêm	Khung giờ tiện trao đổi	Môn học	Điểm hiện tại	Mục tiêu
```

**Số cột: 13**

---

## 👨‍🏫 MENTOR SHEET - Mentor IELTS Form

```
Timestamp	Loại môn đăng ký làm mentor	Họ và tên	Số điện thoại	Email	Châm ngôn	Kinh nghiệm giảng dạy	Link ảnh cá nhân	Reading	Writing	Listening	Speaking	Overall	Điểm chuyên Anh	Giải HSG Tiếng Anh	Link ảnh minh chứng giải HSG	Kỹ năng muốn giảng dạy chuyên sâu
```

**Số cột: 17**

---

## 👨‍🏫 MENTOR SHEET - Mentor SAT Form

```
Timestamp	Loại môn đăng ký làm mentor	Họ và tên	Số điện thoại	Email	Châm ngôn	Kinh nghiệm giảng dạy	Link ảnh cá nhân	Reading & Writing	Math	Overall	Điểm chuyên Anh	Giải HSG Tiếng Anh	Link ảnh minh chứng giải HSG	Lĩnh vực muốn tập trung
```

**Số cột: 15**

---

## 👨‍🏫 MENTOR SHEET - Mentor VN Form

```
Timestamp	Loại môn đăng ký làm mentor	Họ và tên	Số điện thoại	Email	Châm ngôn	Môn giảng dạy	Kinh nghiệm giảng dạy	Điểm thi chuyên môn	Giải HSG	Link ảnh minh chứng giải HSG	Link ảnh cá nhân
```

**Số cột: 12**

---

## 💡 GỢI Ý CẤU TRÚC GOOGLE SHEETS

### Cách 1: Tất cả form vào 1 sheet (Đơn giản)
- **Student Sheet**: Gộp cả 3 form IELTS, SAT, VN
  - Dùng cột **"Loại môn đăng ký"** để phân biệt
  - Tạo header với **TẤT CẢ** các cột (một số cột sẽ trống tùy form)
  - Tổng: ~20 cột (gộp tất cả field unique)

- **Mentor Sheet**: Gộp cả 3 form Mentor IELTS, SAT, VN
  - Dùng cột **"Loại môn đăng ký làm mentor"** để phân biệt
  - Tạo header với **TẤT CẢ** các cột (một số cột sẽ trống tùy form)
  - Tổng: ~20 cột (gộp tất cả field unique)

### Cách 2: Mỗi form 1 sheet riêng (Chuyên nghiệp)
Tạo 6 sheets riêng:
1. Student_IELTS (16 cột)
2. Student_SAT (14 cột)
3. Student_VN (13 cột)
4. Mentor_IELTS (17 cột)
5. Mentor_SAT (15 cột)
6. Mentor_VN (12 cột)

**Nếu chọn cách 2**: Bạn cần cập nhật Apps Script để route data đến đúng sheet theo `category`.

---

## 🔧 SAMPLE APPS SCRIPT (Nếu gộp tất cả vào 1 sheet)

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow(data.values);
    return ContentService.createTextOutput(JSON.stringify({status: 'success'}));
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', message: error.toString()}));
  }
}
```

---

## ✅ CHECKLIST

- [ ] Copy header tương ứng vào hàng 1 của Google Sheets
- [ ] Kiểm tra số cột khớp với số cột trong header
- [ ] Test gửi form để kiểm tra data có vào đúng cột không
- [ ] Nếu dùng nhiều sheet, cập nhật Apps Script để route đúng
