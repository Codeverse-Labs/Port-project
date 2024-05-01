const express = require('express');
const router = express.Router();
const dptController = require('../controllers/dptController');

//get all departments
router.get('/', dptController.getAll);

module.exports = router;