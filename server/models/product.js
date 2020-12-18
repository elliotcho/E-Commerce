import mongoose from 'mongoose';

const DescriptionSchema = new mongoose.Schema({
    content:{
        type: String
    },
    color: {
        type: String
    },
    size: {
        type: String
    },
    brand: {
        type: String
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
        type: DescriptionSchema
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

export const Description = mongoose.model('description', DescriptionSchema);
export const Product = mongoose.model('product', ProductSchema);
