import mongoose from 'mongoose';

const DescriptionSchema = new mongoose.Schema({
    content:{
        type: String
    },
    color: {
        type: String
    },
    brand: {
        type: String
    }
});

const SizeSchema = new mongoose.Schema({
    quantity : {
        type: Number
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
    },
    quantity: {
        type: Number
    },
    size: {
        type: [SizeSchema]
    },
    quantitySold: {
        type: Number,
        default: 0
    }
});

export const Size = mongoose.model('size', SizeSchema);
export const Description = mongoose.model('description', DescriptionSchema);
export const Product = mongoose.model('product', ProductSchema);