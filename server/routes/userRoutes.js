const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// create 
router.post('/', userController.create);

// get all 
router.get('/', userController.getAll);

// get by id
router.get('/:id', userController.getById);

// update
router.put('/:id', userController.updateById);

// delete
router.delete('/:id', userController.deleteById);

module.exports = router;
