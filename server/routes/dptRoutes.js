const express = require('express');
const router = express.Router();
const dptController = require('../controllers/dptController');

// create 
router.post('/', dptController.create);

// get all 
router.get('/', dptController.getAll);

// get by id
router.get('/:id', dptController.getById);

// update
router.put('/:id', dptController.updateById);

// delete
router.delete('/:id', dptController.deleteById);

module.exports = router;