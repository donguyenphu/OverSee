# Google Sheets Column Structure

## Student Forms (IELTS, SAT, VN)

### Common Columns (All Student Forms)
1. Timestamp
2. Loại môn đăng ký (Form Type: IELTS/SAT/VN)
3. Họ và tên
4. Số điện thoại
5. Email
6. Trường
7. Lớp
8. Nguyện vọng thêm
9. Khung giờ tiện trao đổi

### IELTS-Specific Columns (after common columns)
10. Lịch thi dự kiến
11. Reading
12. Writing
13. Listening
14. Speaking
15. Overall
16. Mock Test

### SAT-Specific Columns (after common columns)
10. Lịch thi dự kiến
11. Điểm hiện tại
12. Reading & Writing (RW)
13. Math
14. Mock Test

### VN-Specific Columns (after common columns)
10. Môn học
11. Kết quả hiện tại
12. Mục tiêu
13. Facebook

---

## Mentor Forms (Mentor IELTS, Mentor SAT, Mentor VN)

### Common Columns (All Mentor Forms)
1. Timestamp
2. Loại môn đăng ký làm mentor (Form Type: Mentor IELTS/Mentor SAT/Mentor VN)
3. Họ và tên
4. Số điện thoại
5. Email
6. Châm ngôn
7. Kinh nghiệm giảng dạy
8. Link ảnh cá nhân

### Mentor IELTS-Specific Columns (after common columns)
9. Reading
10. Writing
11. Listening
12. Speaking
13. Overall
14. Điểm chuyên Anh
15. Giải HSG Tiếng Anh
16. Link ảnh minh chứng giải HSG
17. Kỹ năng muốn giảng dạy chuyên sâu

### Mentor SAT-Specific Columns (after common columns)
9. Reading & Writing (RW)
10. Math
11. Overall
12. Điểm chuyên Anh
13. Giải HSG Tiếng Anh
14. Link ảnh minh chứng giải HSG
15. Focus Area (Lĩnh vực muốn tập trung)

### Mentor VN-Specific Columns (after common columns)
9. Môn học
10. Điểm chuyên môn
11. Giải HSG môn VN
12. Link ảnh minh chứng giải HSG

---

## Important Notes

1. **Each form type (IELTS/SAT/VN) has its own set of specific columns** - fields are mapped to separate columns instead of being merged
2. **Name field (Họ và tên)** is now properly included in all mentor forms
3. **Award Drive Link field (Link ảnh minh chứng giải HSG)** is now properly sent to Google Sheets for all mentor forms
4. **The Google Sheets must have headers matching these column orders** for proper data organization
5. Common fields are shared across all forms of the same type (student/mentor), while specific fields are unique to each form variant

## Setup Requirements

Make sure your Google Sheets Apps Script web app handles the data in this order. The `sheets.ts` file sends data as an array in the order specified above.
