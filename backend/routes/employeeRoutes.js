const express = require("express");
const mongoose = require("mongoose");
const Employee = require("../models/Employee");

const router = express.Router();

// Kiem tra du lieu nhan vien
function validateEmployee(data, isUpdate = false) {
  const errors = [];

  if (!isUpdate || data.employeeId !== undefined) {
    if (typeof data.employeeId !== "string" || !data.employeeId.trim()) {
      errors.push("Ma nhan vien la bat buoc");
    }
  }

  if (!isUpdate || data.fullName !== undefined) {
    if (typeof data.fullName !== "string" || !data.fullName.trim()) {
      errors.push("Ho ten la bat buoc");
    }
  }

  if (!isUpdate || data.email !== undefined) {
    if (
      typeof data.email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
    ) {
      errors.push("Email khong hop le");
    }
  }

  return errors;
}

// GET: Lay danh sach va tim kiem nhan vien
router.get("/", async (req, res) => {
  try {
    const search = (req.query.search || "").trim();
    let filter = {};

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter = {
        $or: [
          { employeeId: { $regex: escapedSearch, $options: "i" } },
          { fullName: { $regex: escapedSearch, $options: "i" } }
        ]
      };
    }

    const employees = await Employee.find(filter).sort({ employeeId: 1 });

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Khong the lay danh sach nhan vien"
    });
  }
});

// GET: Tim nhan vien theo ma nhan vien hoac MongoDB ID
router.get("/:id", async (req, res) => {
  try {
    const value = req.params.id;

    let employee = await Employee.findOne({ employeeId: value });

    if (!employee && mongoose.isValidObjectId(value)) {
      employee = await Employee.findById(value);
    }

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Khong tim thay nhan vien"
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Loi khi tim nhan vien"
    });
  }
});

// POST: Them nhan vien
router.post("/", async (req, res) => {
  try {
    const errors = validateEmployee(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Du lieu khong hop le",
        errors
      });
    }

    const employeeId = req.body.employeeId.trim();
    const existing = await Employee.findOne({ employeeId });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Ma nhan vien da ton tai"
      });
    }

    const employee = await Employee.create({
      ...req.body,
      employeeId
    });

    res.status(201).json({
      success: true,
      message: "Them nhan vien thanh cong",
      data: employee
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Ma nhan vien da ton tai"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Loi khi them nhan vien"
    });
  }
});

// PUT: Cap nhat nhan vien
router.put("/:id", async (req, res) => {
  try {
    const errors = validateEmployee(req.body, true);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Du lieu khong hop le",
        errors
      });
    }

    const value = req.params.id;

    let employee = await Employee.findOne({ employeeId: value });

    if (!employee && mongoose.isValidObjectId(value)) {
      employee = await Employee.findById(value);
    }

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Khong tim thay nhan vien"
      });
    }

    if (req.body.employeeId !== undefined) {
      const newEmployeeId = req.body.employeeId.trim();

      const duplicate = await Employee.findOne({
        employeeId: newEmployeeId,
        _id: { $ne: employee._id }
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "Ma nhan vien da ton tai"
        });
      }

      employee.employeeId = newEmployeeId;
    }

    const allowedFields = [
      "fullName",
      "gender",
      "dateOfBirth",
      "department",
      "position",
      "email",
      "phone",
      "hireDate",
      "status"
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        employee[field] = req.body[field];
      }
    });

    await employee.save();

    res.status(200).json({
      success: true,
      message: "Cap nhat nhan vien thanh cong",
      data: employee
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Ma nhan vien da ton tai"
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Loi khi cap nhat nhan vien"
    });
  }
});

// DELETE: Xoa nhan vien
router.delete("/:id", async (req, res) => {
  try {
    const value = req.params.id;

    let employee = await Employee.findOne({ employeeId: value });

    if (!employee && mongoose.isValidObjectId(value)) {
      employee = await Employee.findById(value);
    }

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Khong tim thay nhan vien"
      });
    }

    await employee.deleteOne();

    res.status(200).json({
      success: true,
      message: "Xoa nhan vien thanh cong"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Loi khi xoa nhan vien"
    });
  }
});

module.exports = router;