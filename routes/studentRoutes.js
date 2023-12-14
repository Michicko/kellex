const express = require("express");
const {
  getStudents,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
  checkStudent,
} = require("../controller/studentController");
const router = express.Router();

router.get('/:admissionNumber/check-student', checkStudent)

// check student result
router.route("/").get(getStudents).post(createStudent);
router.route("/:id").get(getStudent).patch(updateStudent).delete(deleteStudent);

module.exports = router;

