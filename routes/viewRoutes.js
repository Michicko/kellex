const express = require("express");
const {
  getHome,
  getWhoWeAre,
  getDirectorMessage,
  getSchoolPolicy,
} = require("../controller/viewsController");
const router = express.Router();

router.get("/", getHome);

router.get("/who-we-are", getWhoWeAre);
router.get("/director-message", getDirectorMessage);
router.get("/school-policy", getSchoolPolicy);



module.exports = router;
