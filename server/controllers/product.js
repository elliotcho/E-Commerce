import {Product, Description} from '../models/product';

export const createProduct = async (req, res) => {
    const {description, price, userId, productName} = req.body;

    const newDescription = new Description({
        ...description
    });

    const newProduct = new Product ({
        description: newDescription,
        price,
        datePosted: new Date(),
        userId,
        productName 
    });

   await newProduct.save();

    res.json({msg: "Success"})
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    await Product.deleteOne({_id: id});

    res.json({msg: "Product Successfully Deleted"});
}

export const getProduct = async (req, res) => {
    const {id} = req.params;
    
    let productDetails = await Product.findOne({_id:id});

    res.json(productDetails);
}

export const productDepartment = async (req, res) => {
    const {departmentId} = req.body;

    let sameDepartment = await Product.find({departmentId});

    res.json(sameDepartment);
}



