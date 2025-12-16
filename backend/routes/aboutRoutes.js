const express = require('express');
const { getAbout, getTeam, addTeamMember, updateTeamMember, deleteTeamMember } = require('../controllers/aboutController');
const verifyToken = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../frontend/public/images/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.get('/', getAbout);
router.get('/team', getTeam);
router.post('/team', verifyToken, upload.single('image'), ...addTeamMember);
router.put('/team/:id', verifyToken, upload.single('image'), ...updateTeamMember);
router.delete('/team/:id', verifyToken, deleteTeamMember);

module.exports = router;