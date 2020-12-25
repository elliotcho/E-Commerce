import React, { Component } from 'react';
import { loadCart, deleteFromCart } from '../../api/user';
import Product from '../products/Product';

class Cart extends Component{
    constructor(){
        super();
        this.state = {
            cart: []
        }

        this.delProductInCart = this.delProductInCart.bind(this);
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

    render(){
        const { cart } = this.state;

        return(
            <div className="cart">
                <h1 className="title">Your Shopping Cart: </h1>
                <button className="btn" >Continue To Payment </button>
        
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
            </div>
        )
        
    }
}
export default Cart;