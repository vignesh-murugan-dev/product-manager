import Product from '../models/productModel.js';

// Get all products
const getAllProducts = async (req, res,next) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        });
    } catch (error) {
        next(error);
    }
}

// Get product by ID
const getProductById = async (req, res,next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (error) {
        next(error);
    }
}

// Create a new product
const createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                product: newProduct
            }
        });
    } catch (error) {
        next(error);
    }
}

// Update a product
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        });
    } catch (error) {
        next(error);
    }
}

// Delete a product
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                status: 'fail',
                message: 'Product not found'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
}

const productController = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

export default productController;