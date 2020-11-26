import { Product } from '../models/product';

export const createProduct = async (req, res) => {
    const { price, productName, departmentId } = req.body;

    // const newDescription = new Description({
    //     ...description
    // });

    const newProduct = new Product ({
        //description: newDescription,
        price,
        datePosted: new Date(),
        productName,
        departmentId,
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
    
    const product = await Product.findOne({_id:id});

    res.json(product);
}