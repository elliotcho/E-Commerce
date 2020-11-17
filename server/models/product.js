import mongoose from 'mongoose';


const DescriptionSchema = new mongoose.Schema({
    summary: String,
    colour: String,
    size: String,
    manufacture: String,
})
const ProductSchema = new mongoose.Schema({
    userid: String,
    datePosted: String,
    price: String,
    description: [DescriptionSchema],
    productName: String,

    
})

export const Description = mongoose.model('descirption', DescriptionSchema);
const Product = mongoose.model('product', ProductSchema);

export default Product;


