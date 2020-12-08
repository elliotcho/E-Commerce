import React, { Component } from 'react';
import { getUserProducts, deleteProduct } from '../../api/product';
import Product from '../products/Product';
import './css/Profile.css';

class Profile extends Component{
    constructor(){
        super();

        this.state = {
            products: []
        }

        this.removeProduct = this.removeProduct.bind(this);
    }

    async componentDidMount(){
        const products = await getUserProducts();
        this.setState({ products });
    }

    async removeProduct(id){
        const { products } = this.state;

        for(let i=0;i<products.length;i++){
            if(products[i]._id === id){
                products.splice(i, 1);
                break;
            }
        }

        await deleteProduct(id);
        this.setState({ products });
    }

    render(){
        const { products } = this.state; 

        return(
            <div className='profile'>
                <i class="fas fa-user-astronaut"></i>
                
                <h3>Master Elliot</h3>

                <section className='container-fluid'>
                    <div className='row'>
                        <div className='stats col-3'>
                            <h2>Personal Stats</h2>
                            <p># of Products Posted: </p>
                            <p>Successful Sales: </p>
                            <p>Average Rating: </p>
                        </div>
                        
                        <div className='posts col-9'>
                            {products.map(p => 
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
                </section>

            </div>
        )
    }
}

export default Profile;