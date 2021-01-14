import React, { useState } from 'react';
import { createSuccessToast, createErrorToast } from '../../utils/createToast';
import { addToUserCart } from '../../api/product';
import './css/CartModal.css';

function CartModal({ 
    productId, 
    size, 
    maxQuantity, 
    refetchProduct,
    name 
}){
    const [quantity, setQuantity] = useState(1);

    const saveChanges = async () => {
        if(quantity > maxQuantity){
            createErrorToast('Quantity limit exceeded');
            return;
        }

        await addToUserCart({ productId, size, quantity });
        await refetchProduct();

        createSuccessToast('Item added to cart');
        closeModal();
    }

    const closeModal = () => document.getElementById('close-cart').click();
    const handleChange = (e) => setQuantity(e.target.value);

    return (
        <div className='cart-modal modal fade' data-backdrop='false'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h3>Add to Cart</h3>

                        <button className='close' onClick={closeModal}>
                            <span>&times;</span>
                        </button>

                        <button 
                            id='close-cart' 
                            data-dismiss='modal'
                            style={{display: 'none'}}
                        />
                    </div>

                    <div className='modal-body'>
                        <h2>{name}</h2>

                        <div className='text-right my-4'>
                            <label htmlFor="quantity" className='mr-3'>
                                Quantity
                            </label>

                            <input
                                name = 'quantity'
                                type = 'number'
                                placeholder='1'
                                value = {quantity}
                                onChange = {handleChange}
                                max = {maxQuantity}
                                min = '1'
                                step = '1'
                            />
                        </div>
                    </div>

                    <div className='modal-footer'>
                        <button className='btn btn-secondary' onClick={closeModal}>
                            Close
                        </button>

                        <button className='btn btn-success' onClick={saveChanges}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartModal;