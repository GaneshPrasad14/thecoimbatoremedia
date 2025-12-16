const About = require('../models/About');
const { body, validationResult } = require('express-validator');

const getAbout = async (req, res) => {
  const about = await About.findOne() || { team: [] };
  res.json(about);
};

const getTeam = async (req, res) => {
  const about = await About.findOne() || { team: [] };
  res.json(about.team);
};

const addTeamMember = [
  body('name').trim().isLength({ min: 1, max: 100 }).escape(),
  body('role').trim().isLength({ min: 1, max: 100 }).escape(),
  body('color').optional().isHexColor(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const imagePath = `/images/${req.file.filename}`;
    const teamMember = {
      name: req.body.name,
      role: req.body.role,
      image: imagePath,
      color: req.body.color || '#FFD700'
    };

    const about = await About.findOneAndUpdate(
      {},
      { $push: { team: teamMember } },
      { upsert: true, new: true }
    );
    res.status(201).json(about.team[about.team.length - 1]);
  }
];

const updateTeamMember = [
  body('name').optional().trim().isLength({ min: 1, max: 100 }).escape(),
  body('role').optional().trim().isLength({ min: 1, max: 100 }).escape(),
  body('color').optional().isHexColor(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updateData = {};
    if (req.body.name) updateData['team.$.name'] = req.body.name;
    if (req.body.role) updateData['team.$.role'] = req.body.role;
    if (req.body.color) updateData['team.$.color'] = req.body.color;
    if (req.file) updateData['team.$.image'] = `/images/${req.file.filename}`;

    const about = await About.findOneAndUpdate(
      { 'team._id': req.params.id },
      { $set: updateData },
      { new: true }
    );

    if (!about) return res.status(404).json({ error: 'Team member not found' });

    const member = about.team.id(req.params.id);
    res.json(member);
  }
];

const deleteTeamMember = async (req, res) => {
  const about = await About.findOneAndUpdate(
    { 'team._id': req.params.id },
    { $pull: { team: { _id: req.params.id } } },
    { new: true }
  );

  if (!about) return res.status(404).json({ error: 'Team member not found' });
  res.json({ message: 'Team member deleted' });
};

module.exports = { getAbout, getTeam, addTeamMember, updateTeamMember, deleteTeamMember };