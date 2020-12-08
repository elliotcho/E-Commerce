import React from 'react';
import './css/Product.css';

function Product({
    image, name, price, description: { content, color, brand, size }
}){
    let textSnippet = content;

    if(content.length > 30){
        textSnippet = textSnippet.substring(0, 27) + '...';
    }

    return(
        <div className='product d-flex'>
            <img src = {image} alt = 'product' />

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
            </div>
        </div>
    );
}

export default Product;