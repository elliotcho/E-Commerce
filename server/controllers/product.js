import { Product, Size } from '../models/product';
import Department from '../models/departments';
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
    
            const { name, departmentId } = req.body;

            if(!departmentId){
                throw new Error('Department ID needed');
            }

            if(name){
                const newProduct = new Product({
                    ...req.body,
                    userId: req.user._id,
                    image: req.file.filename,
                    datePosted: new Date(),
                });
    
                const product = await newProduct.save();

                res.json({ ok: true, product });
            }
       });  
    }
}

export const setProductQuantity = async (req, res) => {
   if(!req.user){
       res.json({ ok: false });
   } else{
        const { productId, ...sizes } = req.body;

        const keys = Object.keys(sizes);

        for(let i=0;i<keys.length;i++){
            const key = keys[i];

            await new Size({
                name: key,
                quantity: sizes[key],
                productId
            }).save();
        }

        res.json({ ok: true });
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
        await Size.deleteMany({ productId: id });

        res.json({msg: "Product Successfully Deleted"});
    }
}

export const getProduct = async (req, res) => {
    const {id} = req.params;
    
    try{
        const product = await Product.findOne({_id:id});
        product.image = '';

        res.json(product);
    } catch (err) {
        res.json(null);
    }
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
    const { dept } = req.params;

    let products = [];

    if(dept !== 'all'){
        const department = await Department.findOne({ key: dept });
        const { _id } = department;

        products = await Product.find({ departmentId : _id });
    } else{
        products = await Product.find({});
    }

    res.json(products);
}

export const getUserProducts = async (req, res) => {
    let products = [];

    if(req.params.uid){
        products = await Product.find({ userId: req.params.uid });
    } else{
        products = await Product.find({ userId : req.user._id });
    }

    res.json(products);
}

export const searchProducts = async (req, res) => {
    const { dept, query } = req.body;

    let products = [];

    if(dept === 'all'){
        products = await Product.find({name: { $regex: query, $options: 'i'} });
    } else{
        const department = await Department.findOne({ key: dept });

        products = await Product.find({
            departmentId: department._id,
            name: { 
                $regex: query, 
                $options: 'i'
            }
        });
    }

    res.json(products);
}