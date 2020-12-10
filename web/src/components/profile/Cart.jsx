import React, { Component } from 'react';
import Product from '../products/Product';
import {loadCart, deleteFromCart} from '../../api/user';

class Cart extends Component{
    constructor(){
        super();
        this.state = {
            myCart: []
        }
    }
    async componentDidMount(){
        const myCart = await loadCart();
        this.setState({
            myCart
        });
    }

    async removeProduct(id){
        const{myCart} = this.state;
        for(let j=0; j < myCart.length; j++){
            if(myCart[j]._id === id){
                myCart.splice(j,1);
                break;
            }
        }
        const data = {id};
        await deleteFromCart(data);
    }

    render(){
        const{myCart} = this.state;
        console.log(myCart);
        return(
            <div className="cart">
                <h1 className="title">Your Shopping Cart: </h1>
            

            <div className='items'>
                {myCart.map(p => 
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
                )}
            </div>
            </div>
        )
        
    }
}
export default Cart;