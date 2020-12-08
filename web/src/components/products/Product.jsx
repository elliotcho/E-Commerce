import React from 'react';
import decode from 'jwt-decode';
import './css/Product.css';

function Product({
    productId,
    description: { content, color, brand, size },
    deleteProduct,
    userId,
    image, 
    name, 
    price
}){
    let isOwner = false;
    let textSnippet = content;

    if(content.length > 30){
        textSnippet = textSnippet.substring(0, 27) + '...';
    }

    try {
        const token = localStorage.getItem('token');
        const { user } = decode(token);

        isOwner = user._id === userId
    } catch (err) {}

    return(
        <div className='product d-flex'>
            <img src={image} alt='product' />

            <div className='ml-2 mt-2'>
                <h2>{name}</h2>

                <div>       
                    <p>{textSnippet}</p>
                </div>

                <div>
                    <h1>
                        {price}$
                    </h1>
                </div>
            </div>

            <div className='ml-auto mr-2'>
                <p>Brand: {brand}</p>
                <p>Size: {size}</p>
                <p>Color: {color}</p>

                {isOwner? 
                    (<i 
                        className='fas fa-trash'
                        onClick = {() => {deleteProduct(productId)}}
                    />) : null
                }
            </div>
        </div>
    );
}

export default Product;