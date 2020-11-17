import Product from '../models/product';

export const createProduct = async (req, res) => {
    const {description, price, date, userid, productname} = req.body

    const newProduct = await new Product ({
        description: description,
        price: price,
        datePosted: date,
        userid: userid,
        productName: productname 

    });

   await newProduct.save();

    res.json({msg: "Success"})
}

export const deleteProduct = async (req, res) => {
    const {id} = req.body;

    await Product.deleteOne({_id:id});

        res.json({msg: "Product Successfully Deleted"});
    
}





