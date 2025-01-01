const ProductServices = require('../../services/product.service');
const ReviewService = require('../../services/review.service');
const productServices = new ProductServices();
const reviewService = new ReviewService();


// Get All Product detail
exports.getAllProducts = async (req, res) => {
    try {
        let product = await productServices.getAllProducts({ isDelete: false});
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error..`})
    }
};

// Get One product detail
exports.getProduct = async (req, res) => {
   try {
    let product = await productServices.getProductById(req.query.productId);
    let review = await reviewService.getAllReview(req.query.productId);
    let totalRating = review.reduce((total, item) => total + item.rating, 0);
    let avgRating = totalRating / review.length;
    console.log(avgRating);
    res.status(200).json({product, rating: avgRaing});
   } catch (error) {
    console.log(error);
    res.status(500).json({message : `Internal server error`})
   } 
}