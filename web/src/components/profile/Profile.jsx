import React, { Component } from 'react';
import { getUserProducts } from '../../api/product';
import Product from '../products/Product';
import './css/Profile.css';

class Profile extends Component{
    constructor(){
        super();

        this.state = {
            products: []
        }
    }

    async componentDidMount(){
        const products = await getUserProducts();
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
                                    image = {p.image}
                                    name = {p.name}
                                    price = {p.price}
                                    userId = {p.userId}
                                    description = {p.description}
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