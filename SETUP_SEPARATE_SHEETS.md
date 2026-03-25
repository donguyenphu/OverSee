# Hướng dẫn tách 1 Sheet thành 3 Tabs (cùng 1 link)

## 🎯 Mục tiêu
Giữ nguyên link Google Sheet cũ, nhưng thay vì gộp tất cả vào 1 tab, giờ tách thành:
- **Student Sheet** (1 link) → 3 tabs: **IELTS**, **SAT**, **VN**
- **Mentor Sheet** (1 link) → 3 tabs: **IELTS**, **SAT**, **VN**

---

## ✅ PHẦN TÔI ĐÃ LÀM (Code đã cập nhật)

### 1. File `sheets.ts` đã được cập nhật
- Giữ nguyên 2 webapp URLs (STUDENT & MENTOR)
- Gửi field `category` để Apps Script biết routing vào tab nào
- Data structure đã tối ưu cho từng form type

---

## 📋 PHẦN BẠN CẦN LÀM

### Bước 1: Chuẩn bị Google Sheets hiện tại

#### A. STUDENT SHEET (link cũ của bạn)

1. Mở Google Sheet Student hiện tại
2. Tạo 3 tabs (nếu chưa có):
   - Đổi tên tab 1 → **IELTS**
   - Tạo tab mới → **SAT**
   - Tạo tab mới → **VN**

3. **Paste headers vào mỗi tab:**

**Tab IELTS (hàng 1):**
```
Timestamp	Loại môn đăng ký	Họ và tên	Số điện thoại	Email	Trường	Lớp	Nguyện vọng thêm	Khung giờ tiện trao đổi	Lịch thi dự kiến	Reading	Writing	Listening	Speaking	Overall	Mock Test
```

**Tab SAT (hàng 1):**
```
Timestamp	Loại môn đăng ký	Họ và tên	Số điện thoại	Email	Trường	Lớp	Nguyện vọng thêm	Khung giờ tiện trao đổi	Lịch thi dự kiến	Điểm hiện tại	Reading & Writing	Math	Mock Test
```

**Tab VN (hàng 1):**
```
Timestamp	Loại môn đăng ký	Họ và tên	Số điện thoại	Email	Facebook	Trường	Lớp	Nguyện vọng thêm	Khung giờ tiện trao đổi	Môn học	Điểm hiện tại	Mục tiêu
```

#### B. MENTOR SHEET (link cũ của bạn)

1. Mở Google Sheet Mentor hiện tại
2. Tạo 3 tabs (nếu chưa có):
   - Đổi tên tab 1 → **IELTS**
   - Tạo tab mới → **SAT**
   - Tạo tab mới → **VN**

3. **Paste headers vào mỗi tab:**

**Tab IELTS (hàng 1):**
```
Timestamp	Loại môn đăng ký làm mentor	Họ và tên	Số điện thoại	Email	Châm ngôn	Kinh nghiệm giảng dạy	Link ảnh cá nhân	Reading	Writing	Listening	Speaking	Overall	Điểm chuyên Anh	Giải HSG Tiếng Anh	Link ảnh minh chứng giải HSG	Kỹ năng muốn giảng dạy chuyên sâu
```

**Tab SAT (hàng 1):**
```
Timestamp	Loại môn đăng ký làm mentor	Họ và tên	Số điện thoại	Email	Châm ngôn	Kinh nghiệm giảng dạy	Link ảnh cá nhân	Reading & Writing	Math	Overall	Điểm chuyên Anh	Giải HSG Tiếng Anh	Link ảnh minh chứng giải HSG	Lĩnh vực muốn tập trung
```

**Tab VN (hàng 1):**
```
Timestamp	Loại môn đăng ký làm mentor	Họ và tên	Số điện thoại	Email	Châm ngôn	Môn giảng dạy	Kinh nghiệm giảng dạy	Điểm thi chuyên môn	Giải HSG	Link ảnh minh chứng giải HSG	Link ảnh cá nhân
```

---

### Bước 2: Cập nhật Apps Script để routing vào đúng tab

#### A. STUDENT SHEET Apps Script

1. Mở Student Google Sheet
2. Click **Extensions** → **Apps Script**
3. **XÓA HẾT** code cũ
4. Paste code mới:

```javascript
function doPost(e) {
  try {
    // Parse dữ liệu từ request
    var data = JSON.parse(e.postData.contents);
    var values = data.values;
    
    // Lấy category từ values[1] (vị trí thứ 2 - "Loại môn đăng ký")
    var category = values[1];
    
    // Xác định tab name dựa vào category
    var sheetName;
    if (category === 'IELTS') {
      sheetName = 'IELTS';
    } else if (category === 'SAT') {
      sheetName = 'SAT';
    } else if (category === 'VN') {
      sheetName = 'VN';
    } else {
      throw new Error('Unknown category: ' + category);
    }
    
    // Lấy sheet theo tên
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    
    if (!sheet) {
      throw new Error('Sheet not found: ' + sheetName);
    }
    
    // Thêm dòng mới
    sheet.appendRow(values);
    
    // Trả về success
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success', sheet: sheetName}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // Log lỗi
    Logger.log('Error: ' + error.toString());
    
    // Trả về error
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error', 
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. Click **Save** (Ctrl+S)
6. **QUAN TRỌNG**: Nếu đây là lần đầu deploy:
   - Click **Deploy** → **New deployment**
   - Select type → **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**
   - Copy URL và paste vào `.env` → `VITE_STUDENT_WEBAPP_URL`

7. **Nếu đã deploy trước đó**:
   - Click **Deploy** → **Manage deployments**
   - Click ✏️ (Edit) ở deployment hiện tại
   - Click **Version** → **New version**
   - Click **Deploy**
   - ✅ URL giữ nguyên, không cần update `.env`

#### B. MENTOR SHEET Apps Script

1. Mở Mentor Google Sheet
2. Click **Extensions** → **Apps Script**
3. **XÓA HẾT** code cũ
4. Paste code mới:

```javascript
function doPost(e) {
  try {
    // Parse dữ liệu từ request
    var data = JSON.parse(e.postData.contents);
    var values = data.values;
    
    // Lấy category từ values[1] (vị trí thứ 2 - "Loại môn đăng ký làm mentor")
    var category = values[1];
    
    // Xác định tab name dựa vào category
    var sheetName;
    if (category === 'Mentor IELTS') {
      sheetName = 'IELTS';
    } else if (category === 'Mentor SAT') {
      sheetName = 'SAT';
    } else if (category === 'Mentor VN') {
      sheetName = 'VN';
    } else {
      throw new Error('Unknown category: ' + category);
    }
    
    // Lấy sheet theo tên
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    
    if (!sheet) {
      throw new Error('Sheet not found: ' + sheetName);
    }
    
    // Thêm dòng mới
    sheet.appendRow(values);
    
    // Trả về success
    return ContentService
      .createTextOutput(JSON.stringify({status: 'success', sheet: sheetName}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    // Log lỗi
    Logger.log('Error: ' + error.toString());
    
    // Trả về error
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error', 
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. Click **Save** (Ctrl+S)
6. **QUAN TRỌNG**: Nếu đây là lần đầu deploy:
   - Click **Deploy** → **New deployment**
   - Select type → **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**
   - Copy URL và paste vào `.env` → `VITE_MENTOR_WEBAPP_URL`

7. **Nếu đã deploy trước đó**:
   - Click **Deploy** → **Manage deployments**
   - Click ✏️ (Edit) ở deployment hiện tại
   - Click **Version** → **New version**
   - Click **Deploy**
   - ✅ URL giữ nguyên, không cần update `.env`

---

## 🎯 SETUP CHO MOCK TEST SHEETS

### Mục tiêu
Tạo 2 Google Sheets riêng biệt cho Mock Test:
- **OverSee Able To Test** → Danh sách email được phép thi
- **OverSee Mock Tested** → Kết quả thi thử đã nộp

---

### Bước 1: Tạo Google Sheets mới

#### A. OverSee Able To Test Sheet
1. Tạo Google Sheet mới
2. Đặt tên: **OverSee Able To Test**
3. Tạo 1 tab duy nhất: **IELTS**
4. Paste header vào hàng 1:
```
Email
```

#### B. OverSee Mock Tested Sheet
1. Tạo Google Sheet mới
2. Đặt tên: **OverSee Mock Tested**
3. Tạo 1 tab duy nhất: **IELTS**
4. Paste header vào hàng 1:
```
Timestamp	Email	Listening Scores	Reading Scores	Writing Result
```

---

### Bước 2: Setup Google Sheets Permissions

Đảm bảo cả 2 sheets đều được chia sẻ **Anyone with link can view**:
1. Mở sheet
2. Click **Share**
3. Change to **Anyone with the link**
4. Permission: **Viewer**

---

### Bước 3: Cập nhật Environment Variables

Trong file `.env` của project, thêm/update:

```env
# Google API Key (cần thiết cho Mock Test)
VITE_GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY

# Mock Test Sheets
VITE_ABLE_TO_TEST_SHEET_ID=YOUR_ABLE_TO_TEST_SHEET_ID
VITE_MOCK_TESTED_SHEET_ID=YOUR_MOCK_TESTED_SHEET_ID
```

**Lưu ý:**
- `VITE_GOOGLE_API_KEY`: Tạo từ [Google Cloud Console](https://console.cloud.google.com/)
- `VITE_ABLE_TO_TEST_SHEET_ID`: Lấy từ URL của **OverSee Able To Test** Sheet
- `VITE_MOCK_TESTED_SHEET_ID`: Lấy từ URL của **OverSee Mock Tested** Sheet

**Cấp quyền cho Google API Key:**
1. Vào [Google Cloud Console](https://console.cloud.google.com/)
2. Chọn project của bạn
3. **APIs & Services** → **Library**
4. Enable **Google Sheets API**
5. **APIs & Services** → **Credentials**
6. Tạo API Key mới
7. **Restrict key** → Chọn **Google Sheets API**

---

### Bước 4: Chia sẻ Google Sheets

Đảm bảo cả 2 sheets đều được chia sẻ **Anyone with link can view**:
1. Mở sheet
2. Click **Share**
3. Change to **Anyone with the link**
4. Permission: **Viewer**

---

### Bước 5: Test Setup

1. Thêm 1 email test vào **OverSee Able To Test** sheet (tab IELTS)
2. Chạy mock test với email đó
3. Kiểm tra kết quả có lưu vào **OverSee Mock Tested** không

---

## ✅ HOÀN THÀNH!

Bây giờ bạn đã có:
- ✅ Header ẩn khi scroll xuống
- ✅ Audio player chỉ có play/pause và volume
- ✅ Writing không highlight lỗi chính tả
- ✅ Chi tiết đáp án đúng/sai cho từng section
- ✅ 2 sheets Mock Test đã setup và sẵn sàng sử dụng
File `.env` của bạn chỉ cần **2 URLs**:

```env
VITE_STUDENT_WEBAPP_URL=https://script.google.com/macros/s/YOUR_STUDENT_SCRIPT_ID/exec
VITE_MENTOR_WEBAPP_URL=https://script.google.com/macros/s/YOUR_MENTOR_SCRIPT_ID/exec
```

**Nếu bạn đã có sẵn 2 URLs này → KHÔNG CẦN THAY ĐỔI GÌ!**

Chỉ cần update Apps Script code ở Bước 2.

---

### Bước 4: Restart Dev Server (nếu cần)

Nếu bạn vừa update `.env`:

```bash
# Stop server (Ctrl+C)
# Start lại
npm run dev
```

Nếu chỉ update Apps Script → **KHÔNG CẦN** restart server.

---

## 🧪 TESTING

### Student Forms:
1. ✅ Điền form IELTS → Check tab **IELTS** trong Student Sheet
2. ✅ Điền form SAT → Check tab **SAT** trong Student Sheet
3. ✅ Điền form VN → Check tab **VN** trong Student Sheet

### Mentor Forms:
4. ✅ Điền form Mentor IELTS → Check tab **IELTS** trong Mentor Sheet
5. ✅ Điền form Mentor SAT → Check tab **SAT** trong Mentor Sheet
6. ✅ Điền form Mentor VN → Check tab **VN** trong Mentor Sheet

---

## 📊 CẤU TRÚC CUỐI CÙNG

```
📁 Google Drive
├── 📄 Student Sheet (1 link)
│   ├── 📑 Tab: IELTS (16 cột)
│   ├── 📑 Tab: SAT (14 cột)
│   └── 📑 Tab: VN (13 cột)
│
└── 📄 Mentor Sheet (1 link)
    ├── 📑 Tab: IELTS (17 cột)
    ├── 📑 Tab: SAT (15 cột)
    └── 📑 Tab: VN (12 cột)
```

---

## ⚠️ TROUBLESHOOTING

### Data vào sai tab
→ Kiểm tra tên tab phải khớp chính xác:
- Student: `IELTS`, `SAT`, `VN`
- Mentor: `IELTS`, `SAT`, `VN` (không có chữ "Mentor")

### Lỗi "Sheet not found"
→ Tên tab chưa đúng hoặc chưa tạo tab

### Data không vào
→ Kiểm tra:
1. Apps Script đã save + deploy new version chưa?
2. Headers đã paste vào hàng 1 của mỗi tab chưa?

---

## 📌 CHECKLIST

- [ ] Tạo 3 tabs trong Student Sheet: IELTS, SAT, VN
- [ ] Paste headers vào 3 tabs của Student Sheet
- [ ] Update Apps Script của Student Sheet
- [ ] Deploy new version (hoặc deploy lần đầu)
- [ ] Tạo 3 tabs trong Mentor Sheet: IELTS, SAT, VN
- [ ] Paste headers vào 3 tabs của Mentor Sheet
- [ ] Update Apps Script của Mentor Sheet
- [ ] Deploy new version (hoặc deploy lần đầu)
- [ ] Test cả 6 forms

**Thời gian ước tính**: 10-15 phút

---

## 💡 LỢI ÍCH

✅ **Giữ nguyên links cũ** - Không cần update `.env`
✅ **Dữ liệu riêng biệt** - Mỗi form type vào đúng tab
✅ **Dễ quản lý** - Tất cả trong 1 file nhưng tách biệt rõ ràng
✅ **Không có cột trống** - Mỗi tab chỉ có đúng những cột cần thiết
