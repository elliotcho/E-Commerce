import React, { Component } from 'react';
import { getProfilePic, updateProfilePic, deleteProfilePic, getUserInfo } from '../../api/user';
import { getUserProducts, deleteProduct } from '../../api/product';
import Product from '../products/Product';
import loading from '../../images/loading.jpg';
import './css/Profile.css';

class Profile extends Component{
    constructor(){
        super();

        this.state = {
            imgURL: null,
            products: [],
            info: null 
        }

        this.changeProfilePic = this.changeProfilePic.bind(this);
        this.removeProfilePic = this.removeProfilePic.bind(this);
    }

    async componentDidMount(){
        const products = await getUserProducts();
        const imgURL = await getProfilePic();
        const info = await getUserInfo();

        this.setState({ 
            imgURL,
            products, 
            info
        });
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
        const { imgURL, products, info } = this.state; 

        return(
            <div className='profile text-center'>
                <header className='p-4'>
                    <div>
                        <img src = {imgURL? imgURL: loading} alt = 'profile pic'/> 
                    </div>
                    
                    <h3>
                        {info ? info.username:'Loading User...'}
                    </h3>

                    <div>
                        <input
                            type = 'file'
                            onChange = {this.changeProfilePic}
                            accept = 'jpg png jpeg'
                        />
                        
                        <button onClick={this.removeProfilePic}>
                            Remove
                        </button>   
                    </div>
                </header>

           
                <div className='row'>
                    <div className='col-4'>
                       <div className='stats'>
                            <h2>Personal Stats</h2>
                            <p># of Products Posted: {products.length}</p>
                            <p>Successful Sales: </p>
                            <p>Average Rating: </p>
                       </div>
                    </div>
                        
                    <div className='col-8 user-products'>
                        {products.map(p => 
                            <Product
                                key = {p._id}
                                productId = {p._id}
                                image = {p.image}
                                name = {p.name}
                                price = {p.price}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;