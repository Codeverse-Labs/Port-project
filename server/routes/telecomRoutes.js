const express = require('express');
const router = express.Router();
const telecomController = require('../controllers/telecomController');

// create 
router.post('/', telecomController.create);

// get all 
router.get('/', telecomController.getAll);

// update
router.put('/:id', telecomController.updateById);

// delete
router.delete('/:id', telecomController.deleteById);

module.exports = router;