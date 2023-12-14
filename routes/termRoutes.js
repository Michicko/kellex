const express = require("express");
const {

} = require("../controller/userController");
const { getTerms, createTerm, getTerm, updateTerm, deleteTerm } = require("../controller/termController");
const router = express.Router();

router.route("/").get(getTerms).post(createTerm);
router.route("/:id").get(getTerm).patch(updateTerm).delete(deleteTerm);

module.exports = router;
