import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { withRouter } from 'react-router-dom';
import { createErrorToast } from '../../utils/createToast';
import { loadCart, deleteFromCart } from '../../api/user';
import Item from './Item';
import './css/Cart.css';

class Cart extends Component{
    constructor(){
        super();

        this.state = {
            cart: []
        }

        this.delProductInCart = this.delProductInCart.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.toHistory = this.toHistory.bind(this);
        this.toPayment = this.toPayment.bind(this);
    }

    async componentDidMount(){
        const cart = await loadCart();
        this.setState({ cart });
    }

    delProductInCart(id){
        const { cart } = this.state;

        const confirmDelete = async () => {
            for(let i=0;i<cart.length;i++){
                if(cart[i]._id === id){
                    cart.splice(i, 1);
                    break;
                }
            }
    
            await deleteFromCart(id);
            this.setState({ cart }); 
        }

        confirmAlert({
            title: 'E-Commerce',
            message: 'Are you sure you want to remove this item?',
            buttons: [
                {label: 'Yes', onClick: confirmDelete},
                {label: 'No', onClick: () => { return; }}
            ]
        });
    }

     calculateTotal(){
        let amount = 0;
        const { cart } = this.state;

        for(let i =0;i<cart.length;i++){
            const item = cart[i];
            const { price, quantity } = item;

            amount += price * quantity;
        }

        if(parseInt(amount) !== amount){
            return parseInt(amount) + 1;
        }

        return parseInt(amount);
    }

    toHistory(){
        this.props.history.push('/history');
    }

    toPayment(){
        if(this.state.cart.length === 0){
            createErrorToast('Cart is empty');
            return;
        }

        this.props.history.push(`/payment`);
    }

    render(){
        const { cart } = this.state;
        
        const total = this.calculateTotal();

        return(
            <div className='cart'>
                <header className='text-center mt-5 mb-4'>
                    <h4>Your Shopping Cart </h4>

                    <h3 className='my-3'>
                        Total Amount: ${total} 
                    </h3>

                    <button className="btn btn-md btn-primary" onClick={this.toPayment}>
                        Continue To Payment 
                    </button>

                    <p onClick={this.toHistory}>
                        Go to History
                    </p>
                </header>
                
                <div className='items'>
                    {cart.map(i => {
                        const removeFromCart = () => this.delProductInCart(i._id);

                        return (
                            <div key={i._id} className ='cart-item'>
                                <Item 
                                    productId = {i.productId}
                                    remove = {removeFromCart}
                                    quantity = {i.quantity}
                                    image = {i.image}
                                    price = {i.price}
                                    name = {i.name}
                                    size = {i.size}
                                />
                            </div>
                        )
                    })}
                </div>       
            </div>
        ) 
    }
}

export default withRouter(Cart);