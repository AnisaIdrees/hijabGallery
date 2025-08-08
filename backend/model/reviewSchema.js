import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  hijabStyleId: {       
    type: String,
    required: true,
  },
  userId: {           
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  rating: {           
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {          
    type: String,
    required: true,
  },

},{timestamps:true});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
