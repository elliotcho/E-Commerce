import React from 'react';
import { withRouter } from 'react-router-dom';
import './css/Product.css';

function Product({
    productId,
    image, 
    name, 
    price,
    history
}){ 
    const toProductDetails = () => {
        history.push(`/product/${productId}`);
    }

    return(
        <div className='card product'>
            <img
                src = {image}
                className = 'card-img-top'
                alt = 'product pic'
            />

            <div className = 'card-body text-center'>
                <h5 className = 'card-title' onClick={toProductDetails}>
                    {name}
                </h5>

                <p>
                    {price.toFixed(2)}$
                </p>
            </div>
        </div>
    );
}

export default withRouter(Product);