const express = require('express');
const router = express.Router();
const userMobileController = require('../controllers/userMobileController');

// create 
router.post('/', userMobileController.create);

// get all 
router.get('/', userMobileController.getAll);

// get all vecant mobiles 
router.get('/vecant/', userMobileController.getVecantMobiles);

// get all vecant mobiles 
router.get('/mobile/:MobileNumber', userMobileController.getByMobiles);

// update
router.put('/:id', userMobileController.updateById);

// delete
router.delete('/:id', userMobileController.deleteById);

module.exports = router;
