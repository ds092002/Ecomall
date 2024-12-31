const { query } = require('express');
const Product = require('../model/product.model');
module.exports = class ProductServices {

    // Add New Product
    async addNewProduct (body) {
        try {
            return await Product.create(body);
        } catch (error) {                                           
            console.log(error);
            return error.message;
        }
    };
    // Get Product
    async getProduct(body) {
        try {
            return await Product.findOne(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
    // Get One Product By ID
    async getProductById(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            console.log(error);
            return error.message
        }
    }
    // Update Product
    async updateProduct(id, body) {
        try {
            return await Product.findByIdAndUpadt(id, { $set: body}, { new: true});
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }
    // Get All Product Details
    async getAllProducts(params) {
        try {
            let categoryWise = query.category && query.category !== "" ? [
                {$match: {category: query.category}}
            ] : [];
            let find = [
                {$match : {isDelete: false}},
                ...categoryWise,
                {$project: {
                    title: 1,
                    price: 1,
                    productImage: 1
                }}
            ];
            let result = await Product.aggregate(find);
            return result;
        } catch (error) {
            console.log(error);
            return error.message
        }
    }
}