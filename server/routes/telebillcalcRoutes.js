const express = require('express');
const router = express.Router();
const telebillcalcController = require('../controllers/telebillcalcController');

// create 
router.post('/', telebillcalcController.create);

// get all 
router.get('/', telebillcalcController.getMonthlyBills);

// update
router.put('/:id', telebillcalcController.updateById);

// delete
router.delete('/:id', telebillcalcController.deleteById);

module.exports = router;