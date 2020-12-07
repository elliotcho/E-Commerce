import { Product, Description } from '../models/product';
import { createUpload } from '../utils/createUpload';

const productUpload = createUpload('product');

export const createProduct = async (req, res) => {
    if(!req.user){
        res.json({ ok: false });
    } else{
        productUpload(req, res, async err => {
            if(err){
                console.log(err);
            }
    
            const { name, price, description, departmentId } = req.body;
            
            const newDescription = new Description({...description});
    
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
       });  
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    await Product.deleteOne({_id: id});

    res.json({msg: "Product Successfully Deleted"});
}

export const getProduct = async (req, res) => {
    const {id} = req.params;
    
    const product = await Product.findOne({_id:id});

    res.json(product);
}

export const getProductInDepartment = async (req, res) => {
    const {departmentId} = req.params;

    const sameDepartment = await Product.find({departmentId});

    res.json(sameDepartment);
}

export const getUserProducts = async (req, res) => {
    const userId = req.user._id;

    const userProducts = await Product.find({userId});

    res.json(userProducts);
}