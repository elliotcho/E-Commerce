import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    productId: {
        type: String,
    },
    content: {
        type: String
    },
    datePosted: {
        type: Date
    },
    rating: {
        type: String
    },
    likes: {
        type: [String],
        default: []
    },
    dislikes: {
        type: [String],
        default: []
    }
})

const Review = mongoose.model('review', ReviewSchema);
export default Review;