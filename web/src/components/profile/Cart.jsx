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
        this.toPayment = this.toPayment.bind(this);
        this.calculateTotalAmount = this.calculateTotalAmount.bind(this);

    }

    async componentDidMount(){
        const cart = await loadCart();
        this.setState({ cart });
    }

    async delProductInCart(id){
        const { cart } = this.state;

        for(let i=0; i<cart.length; i++){
            console.log(cart[i]);

            if(cart[i]._id === id){
                cart.splice(i, 1);
                break;
            }
        }

        this.setState({ cart }, async () => {
            await deleteFromCart(id);
        }); 
    }

     calculateTotalAmount(){
        let amount = 0;
        const{ cart } = this.state;

        for(let i =0 ; i < cart.length ; i++){
            amount = amount + cart[i].price;
        }

        return amount;
    }

    toPayment(){
        const { history } = this.props;

        const total = this.calculateTotalAmount();
       
        history.push(`/payment/${total}`);
    }

    render(){
        const { cart } = this.state;
        const { isDark } = this.context;
        
        const style = isDark? darkStyle: lightStyle;
        
        return(
            <div className="cart" style={style}>
                <h1 className="title">Your Shopping Cart: </h1>

                <button className="btn" onClick={this.toPayment} >
                    Continue To Payment 
                </button>
                
                <div className='items'>
                    {cart.map(p => 
                        <div key={p._id} className ='text-center' style={{maxWidth: 'fit-content'}}>
                            <Product
                                productId = {p._id}
                                description = {p.description}
                                deleteProduct = {this.removeProduct}
                                image = {p.image}
                                name = {p.name}
                                price = {p.price}
                                userId = {p.userId}
                            />

                            <i  
                                onClick = {() => this.delProductInCart(p._id)}  
                                className = 'fas fa-trash-alt' 
                                style={{cursor: 'pointer'}}
                            />
                        </div>
                    )}
                </div>

                <div className='amount'>
                    <h2 >Total Amount: $ </h2>
                    <h2 >{this.calculateTotalAmount()}</h2>
                </div>
            </div>
        )
        
    }
}
export default Cart;