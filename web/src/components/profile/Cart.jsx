import React, { Component } from 'react';
import { loadCart } from '../../api/user';
import Product from '../products/Product';

class Cart extends Component{
    constructor(){
        super();
        this.state = {
            cart: []
        }
    }
    async componentDidMount(){
        const cart = await loadCart();
        this.setState({ cart });
    }

    render(){
        const { cart } = this.state;

        return(
            <div className="cart">
                <h1 className="title">Your Shopping Cart: </h1>
                <button className="btn" >Continue To Payment </button>
        
                <div className='items'>
                    {cart.map(p => 
                        <div className ='text-center' style={{maxWidth: 'fit-content'}}>
                            <Product
                                key = {p._id}
                                productId = {p._id}
                                description = {p.description}
                                deleteProduct = {this.removeProduct}
                                image = {p.image}
                                name = {p.name}
                                price = {p.price}
                                userId = {p.userId}
                            />

                            <i className = 'fas fa-trash-alt' style={{cursor: 'pointer'}}/>
                        </div>
                    )}
                </div>
            </div>
        )
        
    }
}
export default Cart;