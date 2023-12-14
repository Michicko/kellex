const express = require("express");
const {} = require("../controller/studentController");
const {
  getAdmissions,
  createAdmission,
  updateAdmission,
  getAdmission,
  deleteAdmission,
} = require("../controller/admissionController");
const router = express.Router();

router.route("/").get(getAdmissions).post(createAdmission);
router
  .route("/:id")
  .get(getAdmission)
  .patch(updateAdmission)
  .delete(deleteAdmission);

module.exports = router;
