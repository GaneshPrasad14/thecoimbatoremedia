const express = require('express');
const { getCareers, createCareer, updateCareer, deleteCareer } = require('../controllers/careerController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/', getCareers);
router.post('/', verifyToken, ...createCareer);
router.put('/:id', verifyToken, ...updateCareer);
router.delete('/:id', verifyToken, deleteCareer);

module.exports = router;