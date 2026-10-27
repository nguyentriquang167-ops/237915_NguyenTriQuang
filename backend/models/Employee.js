const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: [true, "Ma nhan vien la bat buoc"],
      unique: true,
      trim: true
    },
    fullName: {
      type: String,
      required: [true, "Ho ten la bat buoc"],
      trim: true
    },
    gender: {
      type: String,
      default: ""
    },
    dateOfBirth: {
      type: String,
      default: ""
    },
    department: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      required: [true, "Email la bat buoc"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email khong hop le"]
    },
    phone: {
      type: String,
      default: ""
    },
    hireDate: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "Dang lam viec"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Employee", employeeSchema);