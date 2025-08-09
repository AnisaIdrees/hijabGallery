import Review from '../model/reviewSchema.js'

// ****************** Create *******************//
export const createReview = async (req, res) => {
    try {
        const { rating, reviewText } = req.body;
        const userId = req.user._id;

        if (!rating || !reviewText) {
            return res.status(400).json({ message: 'All fields required' });
        }

        const newReview = new Review({ userId, rating, reviewText });
        await newReview.save();

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// ****************** read *******************//
export const getAllReview = async (req, res) => {
    try {
        const reviews = await Review.find({}).sort({createdAt:-1}).populate('userId', 'name');

        res.status(200).json({
            success: true,
            reviews
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

// ****************** edit *******************//
export const editReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const userId = req.user._id;  
        const updates = req.body;

        // Find review by id
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        // Check if logged-in user owns this review
        if (review.userId.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: 'Unauthorized to edit this review' });
        }

        
        Object.assign(review, updates);
        await review.save();

        res.status(200).json({ success: true, message: 'Review updated successfully', review });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

// ****************** delete *******************//
export const deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}