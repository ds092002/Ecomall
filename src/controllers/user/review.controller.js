const ReviewService = require('../../services/review.service');
const reviewService = new ReviewService();

// Add New and rating on product
exports.addReview = async (req, res) => {
    try {
        let review = await reviewService.getReview({
            user: req.user._id,
            product : req.query.productId,
            isDelete: false
        });
        if (review) {
            return res.status(400).json({ message: `you already reviewed this product`})
        }
        review = await reviewService.addNewReview({ ...req.body, user: req.user._id});
        res.status(201).json({ review, message: `Your review has been submited successfully.`})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error..${console.error()}`})
    }
};

// Get all reviews
exports.getAllReviews = async (req, res) => {
    try {
        let reviews = await reviewService.getAllReviews({isDelete: false});
        if (!review) {
            return res.status(404).json({ meassge: `Review Not Found..`})
        }
        res.status(200).jaon(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server error..${console.error()}`})
    }
};

// Get One review
exports.getReview = async (req, res) => {
    try {
        let review = await reviewService.getReviewById(req.query.Id);
        if (!review) {
            return res.status(404).json({ message: `Review ID not found...`})
        }
        res.status(200).json(review)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error ${console.error()}`})
    }
};

// Update review
exports.updateReview = async (req, res) => {
    try {
        let review = await reviewService.getReviewById(req.query.Id);
        if (!review) {
            return res.status(404).json({ mesage: `This review does not exist!`})
        }
        review = await reviewService.upadteReview(review._id,{...req.body});
        res.status(200).json({review, message: `Product review update successfully..`})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error ${console.error()}`})
    }
};

// Delete Review
exports.deleterReview = async (req, res) => {
    try {
        let review = await reviewService.getReviewById(req.query.Id);
        if (!review) {
            return res.status(404).json({ message: `This Review does not exist..`})
        }
        review = await reviewService.upadteReview(review._id,{isDelete: true})
        res.status(200).json({ message: `The product review has been delete successfully.`})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error..${console.error()}`})
    }
};