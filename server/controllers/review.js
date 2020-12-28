import Review from '../models/review';

export const createReview = async (req, res) => {
    if (!req.user){
        res.json({ ok:false })
    } else{
        const { userId, productId, content, datePosted } = req.body;

        const newReview = new Review({
            userId = req.body.userId,
            productId = req.body.productId,
            content = req.body.content,
            datePosted = req.body.datePosted
        })
    }
}