const mongoose = require('mongoose');
const Review = require('./models/Review');
const fs = require('fs');
const path = require('path');

mongoose.connect('mongodb+srv://thecoimbatoremedia_db_user:DPALYAh6IW9ZRmiq@thecoimbatoremedia.9kic2yr.mongodb.net/?appName=thecoimbatoremedia').then(async () => {
  console.log('Connected');
  // Clear existing reviews
  await Review.deleteMany({});
  console.log('Cleared existing reviews');

  const reviewsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'reviews.json'), 'utf8'));
  for (const review of reviewsData) {
    const newReview = new Review({
      name: review.name,
      rating: review.rating,
      text: review.text,
      published: false  // Set to false so admin can publish them
    });
    await newReview.save();
  }
  console.log('Migrated reviews as unpublished');
  mongoose.disconnect();
}).catch(err => console.error(err));