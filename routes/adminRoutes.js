const express = require('express');
const { getAdmin } = require('../controller/adminController');

const router = express.Router();

/* GET React App */
router.get('/', getAdmin);

module.exports = router;
