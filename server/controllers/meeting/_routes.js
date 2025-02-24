const express = require('express');
const router = express.Router();
const { add, index, view, deleteData, deleteMany } = require('../../controllers/meeting/meeting');

router.post('/add', add);
router.get('/', index);
router.get('/:id', view);
router.delete('/:id', deleteData);
router.delete('/', deleteMany);

module.exports = router;
