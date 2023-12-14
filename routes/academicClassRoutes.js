const express = require("express");
const {

} = require("../controller/userController");
const { getCAcademicClasses, createAcademicClass, getAcademicClass, updateAcademicClass, deleteAcademicClass } = require("../controller/academicClassController");
const router = express.Router();

router.route("/").get(getCAcademicClasses).post(createAcademicClass);
router.route("/:id").get(getAcademicClass).patch(updateAcademicClass).delete(deleteAcademicClass);

module.exports = router;
