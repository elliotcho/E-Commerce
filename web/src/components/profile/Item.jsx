import React from 'react';
import { withRouter } from 'react-router-dom';
import './css/Item.css';

function Item({
    productId,
    removeFromCart,
    history,
    quantity,
    image,
    price,
    name,
    size
}){
    const toProduct = () => history.push(`/product/${productId}`);

    return ( 
        <div className='item my-3'>
            <main>
                <img src={image} alt='product pic' />

                <div className='mt-2'>
                    <p>
                        <span onClick={toProduct}>
                            {name}
                        </span>
                    </p>
                        
                    <div className='mt-3'>
                        <p>Total Price: ${price * quantity}</p>
                        <p>Quantity: {quantity}</p>
                        <p>Size: {size}</p>
                    </div>
                </div>
            </main>
       

            <footer className='card-footer'>
                <i className='fas fa-trash-alt' onClick={removeFromCart}/>
            </footer>
        </div>
    )
}

export default withRouter(Item);