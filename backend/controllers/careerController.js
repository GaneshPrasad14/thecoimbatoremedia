const Career = require('../models/Career');
const { body, validationResult } = require('express-validator');

const getCareers = async (req, res) => {
  const careers = await Career.find();
  res.json(careers);
};

const createCareer = [
  body('role').trim().isLength({ min: 1, max: 100 }).escape(),
  body('dept').trim().isLength({ min: 1, max: 50 }).escape(),
  body('type').trim().isIn(['Full-time', 'Part-time', 'Contract', 'Internship']).escape(),
  body('location').trim().isLength({ min: 1, max: 100 }).escape(),
  body('description').trim().isLength({ min: 1, max: 500 }).escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const career = new Career(req.body);
    await career.save();
    res.status(201).json(career);
  }
];

const updateCareer = [
  body('role').optional().trim().isLength({ min: 1, max: 100 }).escape(),
  body('dept').optional().trim().isLength({ min: 1, max: 50 }).escape(),
  body('type').optional().trim().isIn(['Full-time', 'Part-time', 'Contract', 'Internship']).escape(),
  body('location').optional().trim().isLength({ min: 1, max: 100 }).escape(),
  body('description').optional().trim().isLength({ min: 1, max: 500 }).escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!career) return res.status(404).json({ error: 'Career not found' });
    res.json(career);
  }
];

const deleteCareer = async (req, res) => {
  const career = await Career.findByIdAndDelete(req.params.id);
  if (!career) return res.status(404).json({ error: 'Career not found' });
  res.json({ message: 'Career deleted' });
};

module.exports = { getCareers, createCareer, updateCareer, deleteCareer };