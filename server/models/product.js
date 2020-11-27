import mongoose from 'mongoose';

const DescriptionSchema = new mongoose.Schema({
    summary: String,
    color: String,
    size: String,
    manufacture: String
});

const ProductSchema = new mongoose.Schema({
    // userId: String,
    datePosted: Date,
    price: String,
    // description: DescriptionSchema,
    productName: String,
    departmentId: String
});

// export const Description = mongoose.model('descirption', DescriptionSchema);
export const Product = mongoose.model('product', ProductSchema);
