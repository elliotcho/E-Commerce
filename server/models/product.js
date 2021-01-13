import mongoose from 'mongoose';

const SizeSchema = new mongoose.Schema({
    productId: {
        type: String
    },
    name: {
        type: String,
    },
    quantity : {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    }
});

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    userId: {
        type: String
    },
    departmentId: {
        type: String
    },
    datePosted: {
        type: Date
    }
});

export const Size = mongoose.model('size', SizeSchema);
export const Product = mongoose.model('product', ProductSchema);