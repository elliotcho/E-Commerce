import Review from '../models/review';

export const createReview = async (req, res) => {
    if (!req.user){
        res.json({ ok: false });
    } else{
        const { productId, content, rating } = req.body;
        const me = req.user._id;

        const newReview = new Review({
            userId: me,
            productId,
            content,
            datePosted: new Date(),
            rating
        })

        await newReview.save();
        
        res.json({ ok: true });
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

    res.json({ msg: 'Success' });
}

export const editReview = async (req, res) => {
    if(!req.user){
        res.json({ ok: false });
    } else{
        const { reviewId, content, rating } = req.body;

        await Review.updateOne({ _id: reviewId }, { content, rating });

        res.json({ ok: true });
    }
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

export const removeLike = async (req, res) => {
    if(!req.user){
        res.json({ ok: false });
    } else{
        const { reviewId } = req.params;
        const { _id } = req.user;

        const review = await Review.findOne({ _id: reviewId });
        const { likes } = review;

        likes.splice(likes.indexOf(_id), 1);

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

export const dislikeReview = async (req, res) => {
    if(!req.user){
        res.json({ ok:false });
    } else{
        const { reviewId } = req.body;
        const { _id } = req.user;

        const review = await Review.findOne({ _id: reviewId });
        const { dislikes } = review;

        dislikes.push(_id);

        await Review.updateOne({ _id: reviewId }, { dislikes })
        res.json({ ok: true });
    }
}

export const removeDislike = async (req, res) => {
    if(!req.user){
        res.json({ ok: false });
    } else{
        const { reviewId } = req.params;
        const { _id } = req.user;

        const review = await Review.findOne({ _id: reviewId });
        const { dislikes } = review;

        dislikes.splice(dislikes.indexOf(_id), 1);

        await Review.updateOne({ _id: reviewId }, { dislikes });
        res.json({ ok: true });
    }
}

export const checkIfUserDisliked = async (req, res) => {
    if(!req.user){
        res.json({ disliked: false });
    } else{
        const { reviewId } = req.params;
        const { _id } = req.user;

        const review = await Review.findOne({ _id: reviewId });
        const { dislikes } = review;

        res.json({ disliked: dislikes.includes(_id) });
    }
}

export const getReviewById = async (req, res) => {
    const { id } = req.params;

    const review = await Review.findOne({ _id: id });

    res.json(review);
}