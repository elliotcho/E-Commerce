import Review from '../models/review';

export const createReview = async (req, res) => {
    if (!req.user){
        res.json({ ok:false })
    } else{
        const { productId, content } = req.body;

        const newReview = new Review({
            userId: req.user._id,
            productId,
            content,
            datePosted: new Date()
        })

        const review = await newReview.save();

        res.json({ ok:true, review });
    }
}

export const getReview = async (req, res) => {
    const { productId } = req.body;

    const review = await Review.find({productId});

    res.json(review);
}