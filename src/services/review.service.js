const Review = require('../model/review.model');
module.exports = class ReviewService{

    // Add new review
    async addNewReview(body) {
        try {
            return await Review.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get all review for a specific product
    async getAllReview(query) {
        try {
            let product = query.productId && query.productId !== undefined ? [
                {
                    $match:{product: query.productId}
                }
            ] : [];
            let find = [
                { $match: { isDelete: false}},
                ...product
            ];
            let result = await Review.aggregate(find);
            return result;
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Get review
    async getReview(body) {
        try {
            return await Review.findOne(body).populate('user').populate('product');
        } catch (error) {
            console.log(error);
            return error.message;        
        }
    };

    // Get review by id
    async getReviewById(params) {
        try {
            return await Review.findById(id).populate('user').populate('product');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // Update review
    async upadteReview(id, body) {
        try {
            return await Review.findByIdAndUpdate(id,{ $set: body}, {new: true}).populate('user').populate('product');
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };
}