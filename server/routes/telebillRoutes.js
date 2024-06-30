const express = require('express');
const router = express.Router();
const telebillController = require('../controllers/telebillController');

// create 
router.post('/', telebillController.create);

// get all 
router.get('/', telebillController.getMonthlyBills);

// Route to get all bills in the select month and year and department
router.get('/dpt', telebillController.getDptBills);

// update
router.put('/:id', telebillController.updateById);

// delete
router.delete('/:id', telebillController.deleteById);

module.exports = router;