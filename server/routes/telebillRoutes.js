const express = require('express');
const router = express.Router();
const telebillController = require('../controllers/telebillController');

// create 
router.post('/', telebillController.create);

// get all 
router.get('/', telebillController.getAll);

// update
router.put('/:id', telebillController.updateById);

// delete
router.delete('/:id', telebillController.deleteById);

module.exports = router;