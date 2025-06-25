import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A product name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "A product description is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "A product price is required"],
    },
    discountPercentage: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    stock: {
        type: Number,
        required: [true, "A product stock is required"],
        default: 0,
    },
    brand: {
        type: String,
        required: [true, "A product brand is required"],
    },
    category: {
        type: String,
        required: [true, "A product category is required"],
    },
    thumbnail: {
        type: String,
        required: [true, "A product thumbnail is required"],
    },
    images: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Middleware to update the updatedAt field before saving
productSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;