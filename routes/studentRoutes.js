const express = require("express");
const studentController = require("../controller/studentController");
const router = express.Router();

// CREATE - Add a new student
router.post("/", studentController.addEntries);

// READ - Get all students
router.get("/", studentController.getAllStudents);

// READ - Get student by ID
router.get("/:id", studentController.getStudentById);

// UPDATE - Update student by ID
router.put("/:id", studentController.updateStudent);

// DELETE - Delete student by ID
router.delete("/:id", studentController.deleteStudent);

module.exports = router;