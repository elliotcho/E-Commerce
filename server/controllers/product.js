import { Product, Description } from '../models/product';
import { createUpload } from '../utils/createUpload';
import path from 'path';
import fs from 'fs';

const productUpload = createUpload('product');

export const createProduct = async (req, res) => {
    if(!req.user){
        res.json({ ok: false });
    } else{
        productUpload(req, res, async err => {
            if(err){
                console.log(err);
            }
    
            const { name, price, departmentId } = req.body;
            
            const newDescription = new Description({
                content: req.body.content,
                color: req.body.color,
                size: req.body.size,
                brand: req.body.brand
            });

            if(name){
                const newProduct = new Product({
                    userId: req.user._id,
                    departmentId,
                    image: req.file.filename,
                    description: newDescription,
                    datePosted: new Date(),
                    name,
                    price
                });
    
                const product = await newProduct.save();
    
                res.json({ ok: true, product });
            }
       });  
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    const product = await Product.findOne({ _id : id});

    if(req.user && product.userId !== req.user._id){
        res.json({msg: 'not authenticated'});
    } else{
        fs.unlink(path.join(__dirname, '../', `images/product/${product.image}`), err => {
            if(err) {
                console.log(err);
            }
        });

        await Product.deleteOne({ _id : id });

        res.json({msg: "Product Successfully Deleted"});
    }
}

export const getProduct = async (req, res) => {
    const {id} = req.params;
    
    const product = await Product.findOne({_id:id});
    product.image = '';

    res.json(product);
}

export const getProductImage = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
 
    if(product && product.image){
        res.sendFile(path.join(__dirname, '../', `images/product/${product.image}`));
    } else{
        res.sendFile(null);
    }
}

export const getProductsByDepartment = async (req, res) => {
    const products = await Product.find({ departmentId : req.params.dept });

    products.forEach(p => {
        p.image = '';
    });

    res.json(products);
}

export const getUserProducts = async (req, res) => {
    const products = await Product.find({ userId : req.user._id });

    products.forEach(p => {
        p.image = '';
    });

    res.json(products);
}