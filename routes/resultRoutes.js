const express = require("express");
const {
  getResults,
  createResult,
  getResult,
  updateResult,
  deleteResult,
} = require("../controller/resultController");
const { upload } = require("../utils/multer");
const router = express.Router({ mergeParams: true });

router.route("/").get(getResults).post(upload, createResult);
router.route("/:id").get(getResult).patch(updateResult).delete(deleteResult);

module.exports = router;
