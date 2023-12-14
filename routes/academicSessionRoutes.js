const express = require("express");
const {} = require("../controller/userController");
const {
  getAcademicSessions,
  createAcademicSession,
  getAcademicSession,
  updateAcademicSession,
  deleteAcademicSession,
} = require("../controller/academicSessionController");
const router = express.Router();

router.route("/").get(getAcademicSessions).post(createAcademicSession);
router
  .route("/:id")
  .get(getAcademicSession)
  .patch(updateAcademicSession)
  .delete(deleteAcademicSession);

module.exports = router;
