import React, { Component } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { decodeUser } from '../../utils/decodeUser';
import * as userAPI from '../../api/user';
import { getUserProducts } from '../../api/product';
import Product from '../products/Product';
import loading from '../../images/loading.jpg';
import './css/Profile.css';

const lightStyle = { backgroundColor: '#9ad3bc', color: '#3f3e3e' };
const darkStyle = { backgroundColor: '#34626c', color: 'white' };

class Profile extends Component{
    static contextType = ThemeContext;

    constructor(){
        super();

        this.state = {
            imgURL: null,
            products: [],
            avgRating: null,
            info: null 
        }

        this.fetchProfileData = this.fetchProfileData.bind(this);
        this.changeProfilePic = this.changeProfilePic.bind(this);
        this.removeProfilePic = this.removeProfilePic.bind(this);
        this.messageUser = this.messageUser.bind(this);
    }

    async componentDidMount(){
       await this.fetchProfileData();
    }

    async componentDidUpdate(prevProps){
        const { uid } = this.props.match.params;

        if(uid !== prevProps.match.params.uid){
            await this.fetchProfileData();
        }
    }

    async fetchProfileData(){
        const { uid } = this.props.match.params;
        const { getUserInfo, getProfilePic, getAvgRating } = userAPI; 

        let info;
        let products;
        let imgURL;
        let avgRating;
        
        if(uid){
            info = await getUserInfo(uid);
            products = await getUserProducts(uid);
            imgURL = await getProfilePic(uid);
            avgRating  = await getAvgRating(uid);
        } else{
            info = await getUserInfo();
            products = await getUserProducts();
            imgURL = await getProfilePic();
            avgRating  = await getAvgRating();
        }

        this.setState({ 
            imgURL,
            products, 
            avgRating,
            info
        });
    }

    async changeProfilePic(e){
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        const imgURL = await userAPI.updateProfilePic(formData);

        this.setState({ imgURL });
    }

    async removeProfilePic(){
        const imgURL = await userAPI.deleteProfilePic();
        this.setState({ imgURL });
    }

    messageUser(){
        const { history } = this.props;
        const { info } = this.state;

        if(info && info._id){
            history.push(`/chat/${info._id}`);
        }
    }

    render(){
        const { imgURL, products, info, avgRating } = this.state; 
        const { isDark } = this.context;

        const user = decodeUser();
        const isOwner = user && info && (user._id === info._id); 

        const style = isDark? darkStyle: lightStyle;

        return(
            <div className='profile' style={style}>
                <header className='p-2 text-center'>
                    <img src = {imgURL? imgURL: loading} alt = 'profile pic'/> 
                
                    <h3>{info ? info.username:'Loading User...'}</h3>

                    {isOwner? 
                        (
                            <div>
                                <button className='btn-primary'>
                                    <label htmlFor='profilePic'>Update</label>
                                </button>

                                <input
                                    type = 'file'
                                    id = 'profilePic'
                                    onChange = {this.changeProfilePic}
                                    style = {{display: 'none'}}
                                    accept = 'jpg png jpeg'
                                />
                                    
                                <button className='btn-danger' onClick={this.removeProfilePic}>
                                    <label>Delete</label>
                                </button>   
                            </div>
                        ) : 
                        (
                            <div>
                                <button className='btn-primary' onClick={this.messageUser}>
                                    <label>Message</label>
                                </button>
                            </div>
                        )
                    }
                </header>

           
                <main className='row mt-5 mb-4'>
                    <div className='col-12 col-xl-3'>
                        <div className = 'stats text-center'>
                            <h2>Personal Stats</h2>
                            
                            <p>Email: {info && info.email? info.email : 'Loading...'}</p>
                            <p># of Products Posted: {products.length}</p>
                            <p>Average Rating: {avgRating? avgRating: 'N/A'}</p>
                        </div>
                    </div>
                        
                    <div className='col-12 col-xl-9 d-flex user-products'>
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
                </main>
            </div>
        )
    }
}

export default Profile;