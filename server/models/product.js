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
        type: String,
        default: null
    },
    price: {
        type: Number
    },
    description: {
        type: String,
        maxlength: 300
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

export const Product = mongoose.model('product', ProductSchema);
export const Size = mongoose.model('size', SizeSchema);