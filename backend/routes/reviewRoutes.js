const express = require('express');
const { getReviews, createReview, getUnpublishedReviews, publishReview } = require('../controllers/reviewController');
const verifyToken = require('../middleware/auth');

const router = express.Router();

router.get('/', getReviews);
router.post('/', ...createReview);
router.get('/unpublished', verifyToken, getUnpublishedReviews);
router.put('/:id/publish', verifyToken, publishReview);

module.exports = router;