import React, { Component } from 'react';
import { getProfilePic, updateProfilePic, deleteProfilePic } from '../../api/user';
import { getUserProducts, deleteProduct } from '../../api/product';
import Product from '../products/Product';
import loading from '../../images/loading.jpg';
import './css/Profile.css';

class Profile extends Component{
    constructor(){
        super();

        this.state = {
            imgURL: null,
            products: []
        }

        this.removeProduct = this.removeProduct.bind(this);
        this.changeProfilePic = this.changeProfilePic.bind(this);
        this.removeProfilePic = this.removeProfilePic.bind(this);
    }

    async componentDidMount(){
        const products = await getUserProducts();
        const imgURL = await getProfilePic();

        this.setState({ 
            imgURL,
            products 
        });
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

    async changeProfilePic(e){
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        const imgURL = await updateProfilePic(formData);

        this.setState({ imgURL });
    }

    async removeProfilePic(){
        const imgURL = await deleteProfilePic();
        this.setState({ imgURL });
    }

    render(){
        const { imgURL, products } = this.state; 

        return(
            <div className='profile'>
                <img src = {imgURL? imgURL: loading} alt = 'profile pic'/>
                
                <h3>Master Elliot</h3>

                <input
                    type = 'file'
                    onChange = {this.changeProfilePic}
                    accept = 'jpg png jpeg'
                />
                
                <button onClick={this.removeProfilePic}>
                    Remove
                </button>

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