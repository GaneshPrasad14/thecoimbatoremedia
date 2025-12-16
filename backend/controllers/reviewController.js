const Review = require('../models/Review');
const { body, validationResult } = require('express-validator');

const getReviews = async (req, res) => {
  const reviews = await Review.find({ published: true });
  res.json(reviews);
};

const createReview = [
  body('name').trim().isLength({ min: 1, max: 100 }).escape(),
  body('rating').isInt({ min: 0, max: 100 }),
  body('text').trim().isLength({ min: 1, max: 1000 }).escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const review = new Review({ ...req.body, published: false });
    await review.save();
    res.status(201).json(review);
  }
];

const getUnpublishedReviews = async (req, res) => {
  const reviews = await Review.find({ published: false });
  res.json(reviews);
};

const publishReview = async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, { published: true }, { new: true });
  res.json(review);
};

module.exports = { getReviews, createReview, getUnpublishedReviews, publishReview };