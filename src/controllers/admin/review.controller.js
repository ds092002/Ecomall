const ReviewService = require('../../services/review.service');
const reviewService = new ReviewService();

// Get all review
exports.getAllReview = async (req, res) => {
    try {
        let review = await reviewService.getAllReview({ isDelete: false});
        if(!review){
            return res.status(404).json({ message: `Review not found...`})
        }
        res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message:`Internal server error... ${console.error()}`})
    }
};

// Delete review
exports.deleteReview = async (req, res) => {
    try {
        let review = await reviewService.getReviewById(req.query.reviewId);
        if (!review) {
            return res.status(404).json({ mwssage: `This Review doesn't exist`})
        }
        review = await reviewService.upadteReview(review._id, {isDelete: true});
        res.status(200).json({message: `The product review has been delete successfully.`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error...${console.error()}`})
    }
};