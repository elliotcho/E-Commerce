import React, { Component } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { loadCart, deleteFromCart } from '../../api/user';
import Item from './Item';
import './css/Cart.css';

const lightStyle = { backgroundColor: '#9ad3bc', color: '#3f3e3e' };
const darkStyle = { backgroundColor: '#34626c', color: 'white' };

class Cart extends Component{
    static contextType = ThemeContext;

    constructor(){
        super();

        this.state = {
            cart: []
        }

        this.delProductInCart = this.delProductInCart.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.toPayment = this.toPayment.bind(this);
    }

    async componentDidMount(){
        const cart = await loadCart();
        this.setState({ cart });
    }

    async delProductInCart(id){
        const { cart } = this.state;

        for(let i=0;i<cart.length;i++){
            if(cart[i]._id === id){
                cart.splice(i, 1);
                break;
            }
        }

        await deleteFromCart(id);
        this.setState({ cart }); 
    }

     calculateTotal(){
        let amount = 0;
        const { cart } = this.state;

        for(let i =0;i<cart.length;i++){
            const item = cart[i];
            const { price, quantity } = item;

            amount += price * quantity;
        }

        return amount;
    }

    toPayment(){
        this.props.history.push(`/payment`);
    }

    render(){
        const { cart } = this.state;
        const { isDark } = this.context;
        
        const style = isDark? darkStyle: lightStyle;

        const total = this.calculateTotal();

        return(
            <div className="cart" style={style}>
                <header className='text-center my-5'>
                    <h3>Your Shopping Cart </h3>

                    <h2 className='my-3'>
                        Total Amount: ${total} 
                    </h2>

                    <button className="btn btn-lg btn-primary" onClick={this.toPayment}>
                        Continue To Payment 
                    </button>
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

export default Cart;