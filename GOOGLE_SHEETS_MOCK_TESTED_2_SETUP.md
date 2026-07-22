# Setup Mock Tested 2

## 1. Chuẩn bị spreadsheet

Mở spreadsheet có ID trong `VITE_MOCK_TESTED_2_SHEET_ID` và tạo một tab tên chính xác là `IELTS`.

Dòng đầu tiên phải là 11 cột theo đúng thứ tự:

```text
Email | Listening Part 1 | Listening Part 2 | Listening Part 3 | Listening Part 4 | Reading Section 1 | Reading Section 2 | Reading Section 3 | Writing Section 1 | Writing Section 2 | Timestamp
```

Không thêm cột `testId` vào giữa các cột. Test 2 đã có spreadsheet riêng nên không cần cột phân biệt đề.

## 2. Cài Apps Script

1. Mở spreadsheet Mock Tested 2.
2. Chọn **Extensions > Apps Script**.
3. Xóa code cũ trong editor.
4. Mở file `google-apps-script/mock-tested-2/Code.gs` trong repository và dán toàn bộ nội dung vào Apps Script.
5. Bấm **Save**.
6. Chọn hàm `setupMockTested2` ở thanh chọn hàm rồi bấm **Run** một lần. Cấp quyền cho Apps Script nếu Google hỏi.
7. Kiểm tra tab `IELTS` đã có đúng header.

## 3. Deploy Web App

1. Chọn **Deploy > New deployment**.
2. Chọn loại **Web app**.
3. **Execute as:** Me.
4. **Who has access:** Anyone.
5. Bấm **Deploy**.
6. Copy URL `/exec`, không dùng URL `/dev`.
7. Dán URL vào `.env`:

```env
VITE_MOCK_TESTED_2_SHEET_ID=your_mock_tested_2_spreadsheet_id
VITE_MOCK_TESTED_2_WEBAPP_URL=https://script.google.com/macros/s/your_deployment_id/exec
```

Sau khi sửa `.env`, phải restart Vite bằng `npm run dev`.

## 4. Kiểm tra Web App

Mở URL `/exec` trên trình duyệt. Kết quả đúng phải là JSON tương tự:

```json
{"ok":true,"message":"Mock Tested 2 web app is running"}
```

Sau đó làm một bài Test 2 bằng email có trong cột A của spreadsheet Able To Test 2. Khi nộp bài, Apps Script sẽ thêm **một dòng duy nhất** vào tab `IELTS`. Email trong dòng kết quả cũng được dùng để nhận biết email đã thi; không cần ghi email bằng Google Sheets API lần thứ hai.

Nếu chưa có dòng mới:

- Mở Apps Script > **Executions** và xem lỗi của `doPost`.
- Kiểm tra tab phải tên `IELTS`.
- Kiểm tra URL là bản deployment `/exec` mới nhất.
- Kiểm tra quyền deployment là **Anyone**.
- Kiểm tra 11 giá trị frontend gửi khớp 11 cột header.
- Restart Vite sau khi thay `.env`.

## 5. Database câu hỏi trong source code

Database được đăng ký tại `src/data/ieltsMockTests.ts`. Các entry point theo từng đề nằm ở:

- `src/data/tests/test-1/index.ts`
- `src/data/tests/test-2/index.ts`
- Kiểu dữ liệu chung: `src/data/tests/types.ts`

Dữ liệu hiện có của Test 1 vẫn nằm trong các module dữ liệu gốc để giữ tương thích với các component cũ:

- `src/data/listeningTranscripts.ts`: transcript Listening.
- `src/data/readingContent.ts`: passage và câu hỏi Reading.
- `src/data/answerKeys.ts`: đáp án Listening và Reading.
- Nội dung Writing nằm trong database entry của từng đề.

Hiện tại Test 2 đang trỏ tới cùng database Test 1 vì repository chưa có bộ câu hỏi/đáp án Test 2 riêng. Khi có đề mới, thay `testTwoDatabase` trong `src/data/tests/test-2/index.ts` bằng transcript, reading, writing và answer key của đề 2; không cần sửa router hoặc luồng submit sheet.
