import React, { Component } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { loadCart, deleteFromCart } from '../../api/user';
import Product from '../products/Product';
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
            amount += cart[i].price;
        }

        return amount;
    }

    toPayment(){
        const { history } = this.props;
        const total = this.calculateTotal();
       
        history.push(`/payment/${total}`);
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
                    {cart.map(p => {
                        const removeFromCart = () => this.delProductInCart(p._id);

                        return (
                            <div key={p._id} className ='cart-product text-center'>
                                <Product
                                    productId = {p._id}
                                    showFooter = {true}
                                    removeFromCart = {removeFromCart}
                                    image = {p.image}
                                    name = {p.name}
                                    price = {p.price}
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