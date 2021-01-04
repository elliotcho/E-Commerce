import Review from '../models/review';

export const createReview = async (req, res) => {
    if (!req.user){
        res.json({ ok: false });
    } else{
        const { productId, content } = req.body;

        const newReview = new Review({
            userId: req.user._id,
            productId,
            content,
            datePosted: new Date()
        })

        const review = await newReview.save();

        res.json({ ok: true, review });
    }
}

export const getReviews = async (req, res) => {
    const { productId } = req.params;

    const reviews = await Review.find({ productId });

    reviews.sort((a, b) => b.datePosted - a.datePosted);
    res.json(reviews);
}

export const deleteReview = async (req, res) => {
    const { id } = req.params;

    await Review.deleteOne({ _id: id });

    res.json({msg: 'Successfully Deleted'});
}

export const likeReview = async (req, res) => {
    if(!req.user){
        res.json({ ok: false });
    } else{
        const { reviewId } = req.body;
        const { _id } = req.user;
    
        const review = await Review.findOne({ _id: reviewId });
        const { likes } = review;
    
        likes.push(_id);
    
        await Review.updateOne({ _id: reviewId }, { likes });
    
        res.json({ ok: true });
    }
}

export const checkIfUserLiked = async (req, res) => {
    if(!req.user){
        res.json({ liked: false });
    } else{
        const { reviewId } = req.params;
        const { _id } = req.user;

        const review = await Review.findOne({ _id: reviewId });
        const { likes } = review;

        res.json({ liked: likes.includes(_id) });
    }
}