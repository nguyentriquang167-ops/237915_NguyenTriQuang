# Hệ thống quản lý nhân sự

## 1. Thông tin sinh viên
- Họ tên: Nguyễn Trí Quang
- MSSV: 237915
- Lớp: DH23TIN09

## 2. Mô tả dự án
Hệ thống quản lý nhân sự hỗ trợ hiển thị danh sách, xem chi tiết, thêm, tìm kiếm, cập nhật và xóa hồ sơ nhân viên.

Dữ liệu được lưu trữ trên MongoDB Atlas. Frontend giao tiếp với Backend thông qua REST API.

## 3. Công nghệ sử dụng
- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Container: Docker
- Source control: Git, GitHub
- Deployment: Render

## 4. Hướng dẫn chạy môi trường phát triển

### Backend
1. Mở terminal tại thư mục backend.
2. Chạy npm install.
3. Tạo file .env dựa trên .env.example.
4. Cấu hình PORT và MONGODB_URI trong file .env.
5. Chạy npm run dev khi đã cấu hình script tương ứng.

### Frontend
1. Mở terminal tại thư mục frontend.
2. Chạy npm install.
3. Chạy npm run dev khi đã cấu hình script tương ứng.

## 5. Tài nguyên triển khai
- GitHub Repository: Chưa triển khai
- Docker Hub Backend: Chưa triển khai
- Docker Hub Frontend: Chưa triển khai
- Render App: Chưa triển khai
- Render API: Chưa triển khai
- MongoDB Atlas: Chưa cấu hình

## 6. Bảo mật
Không đưa file .env, mật khẩu, token hoặc chuỗi kết nối có thông tin xác thực lên GitHub.
## 7. Cơ sở dữ liệu MongoDB Atlas

- Database: `237915_NguyenTriQuang`
- Collection: `employees`
- Số hồ sơ nhân viên mẫu: 3
- Nền tảng lưu trữ: MongoDB Atlas
- Quyền truy cập: Database User có quyền đọc và ghi dữ liệu.
- Bảo mật: Không đưa mật khẩu hoặc chuỗi kết nối chứa thông tin xác thực lên GitHub.