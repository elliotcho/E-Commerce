import React from 'react';
import { withRouter } from 'react-router-dom';
import './css/Product.css';

function Product({
    showFooter,
    removeFromCart,
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
        <div className='product card p-2'>
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

            {showFooter && (
                <div className = 'card-footer text-center'>
                    <i  
                        onClick = {removeFromCart}  
                        className = 'fas fa-trash-alt' 
                        style={{cursor: 'pointer'}}
                    />
                </div>
            )}
        </div>
    );
}

export default withRouter(Product);