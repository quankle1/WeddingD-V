# Hướng dẫn Setup Google Sheets cho Form RSVP

## Bước 1: Chuẩn bị Google Sheets

1. Mở Google Sheets của bạn: 
   https://docs.google.com/spreadsheets/d/10D2WBNRVmSxfzMoUXEV2aKxGpnX2KfLv_JrDgItuwLw/edit

2. Tạo header cho các cột (nếu chưa có):
   - Cột A: **Họ tên**
   - Cột B: **Lời nhắn**
   - Cột C: **Bạn sẽ đến chứ?**
   - Cột D: **Bạn tham dự cùng ai?**
   - Cột E: **Thời gian gửi**

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheets, click menu **Extensions** → **Apps Script**

2. Xóa code mẫu có sẵn

3. Copy toàn bộ code từ file `google-script.js` và paste vào

4. Click **Save** (icon đĩa mềm) hoặc Ctrl+S

5. Đặt tên project là "Wedding RSVP Form Handler"

## Bước 3: Deploy Web App

1. Click nút **Deploy** (ở góc trên bên phải) → **New deployment**

2. Click icon **⚙️ (Settings)** bên cạnh "Select type"

3. Chọn **Web app**

4. Cấu hình:
   - **Description**: "Wedding RSVP Form v1.0"
   - **Execute as**: **Me** (email của bạn)
   - **Who has access**: **Anyone**

5. Click **Deploy**

6. **Ủy quyền**:
   - Click **Authorize access**
   - Chọn tài khoản Google của bạn
   - Nếu có cảnh báo "Google hasn't verified this app", click **Advanced** → **Go to [tên project] (unsafe)**
   - Click **Allow**

7. **Copy URL**: Sau khi deploy thành công, bạn sẽ nhận được một URL dạng:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
   **COPY URL NÀY!**

## Bước 4: Cập nhật Code Thiệp Cưới

1. Mở file `f:\WeddingCard\page2.js`

2. Tìm dòng:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```

3. Thay thế bằng URL bạn vừa copy:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```

4. Save file

## Bước 5: Test

1. Mở file `page2.html` trong trình duyệt

2. Scroll xuống phần form RSVP

3. Điền thông tin test và click "GỬI LỜI NHẮN & XÁC NHẬN"

4. Kiểm tra Google Sheets xem có dữ liệu mới không

## Lưu ý quan trọng

- ⚠️ URL Apps Script chỉ hoạt động khi bạn đã deploy và cấp quyền đầy đủ
- 🔄 Mỗi lần update code trong Apps Script, bạn cần deploy lại (New deployment hoặc Manage deployments)
- 📝 Dữ liệu sẽ được thêm vào sheet đang active (sheet đầu tiên)
- 🔒 Đảm bảo Google Sheet có quyền "Anyone with the link can view" nếu muốn share

## Troubleshooting

**Lỗi: Form không gửi được**
- Kiểm tra URL có đúng không
- Kiểm tra console browser (F12) xem có lỗi gì
- Đảm bảo đã deploy và authorize

**Lỗi: "Permission denied"**
- Re-deploy Apps Script
- Kiểm tra lại phần authorization

**Dữ liệu không xuất hiện trong Sheet**
- Kiểm tra xem có đang ở đúng sheet không
- Kiểm tra logs trong Apps Script (View → Executions)
