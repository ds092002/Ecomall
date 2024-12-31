const ProductServices = require('../../services/product.service');
const productServices = new ProductServices();

// Add New Product
exports.addNewProduct = async (res, req) => {
    try {
        let product = await productServices.getProduct({ title: req.body.title, isDelete: false});
        if (product) {
            res.status(400).json({ message: `Product is Already exist....`})
        };
        if (req.file) {
            console.log(req.file);
            productImage = req.file.path.replace(/\\/g,'/');
        }
        product = await productServices.addNewProduct({...req.body});
        res.status(201).json({product, message: `Product has benn added successfully`});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Internal server error...${console.error()}`})
    }
};

// Get All Product
exports.getAllProducts = async (req, res) => {
    try {
        let products = await productServices.getAllProducts({ isDelete: false});
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error...`})
    }
}

// Get One Product
exports.getProduct = async (req, res) => {
    try {
        let product = await productServices.getProductById(req.query.productId);
        if (!product) {
            return res.status(404).json({message:`Product is not found...`})
        }
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error`})
    }
}

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        let product = await productServices.getProductById(req.query.productId);
        if (!product) {
            return res.status(404).json({message:`Product is not found`})
        }
        product = await productServices.updateProduct(product._id,{...req.body});
        res.status(202).json({ message:`Product has been update successfully`})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error`})
    }
}

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        let product = await productServices.getProductById(req.query.productId);
        if (!product) {
            res.status(404).json({ message: `Product is not found..`})
        }
        product = await productServices.updateProduct(product._id, {isDelete: true});
        res.status(202).json({ message: `Product has been deleted succesfully`, product})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server error`})
    }
}