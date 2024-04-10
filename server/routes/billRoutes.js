const express = require('express');
const router = express.Router();
const multer = require('multer');
const billController = require('../controllers/billController');

// Multer middleware for handling file uploads
const upload = multer({ dest: 'uploads/' });

// POST endpoint for uploading bills
router.post('/upload', upload.single('billFile'), billController.uploadBill);

// Route to get all bills in the select month and year
router.get('/', billController.getMonthlyBills);

// Route to get all bills in the select month and year and department
router.get('/dpt', billController.getDptBills);

module.exports = router;
