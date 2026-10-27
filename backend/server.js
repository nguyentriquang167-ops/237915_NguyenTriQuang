require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Kiem tra trang thai Backend
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend dang hoat dong"
  });
});

// API quan ly nhan vien
app.use("/api/employees", employeeRoutes);

// Xu ly duong dan khong ton tai
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API khong ton tai"
  });
});

// Ket noi MongoDB Atlas va khoi dong server
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Chua cau hinh MONGODB_URI trong file .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Ket noi MongoDB Atlas thanh cong");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Backend dang chay tai cong ${PORT}`);
    });
  } catch (error) {
    console.error("Khong the khoi dong Backend:", error.message);
    process.exit(1);
  }
}

startServer();