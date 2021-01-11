import React, { Component } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import decode from 'jwt-decode';
import { getProfilePic, updateProfilePic, deleteProfilePic, getUserInfo } from '../../api/user';
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

        let info;
        let products = [];
        let imgURL = null;
        
        if(uid){
            info = await getUserInfo(uid);
            products = await getUserProducts(uid);
            imgURL = await getProfilePic(uid);
        } else{
            info = await getUserInfo();
            products = await getUserProducts();
            imgURL = await getProfilePic();    
        }

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

    messageUser(){
        const { history } = this.props;
        const { info } = this.state;

        if(info && info._id){
            history.push(`/chat/${info._id}`);
        }
    }

    render(){
        const { imgURL, products, info } = this.state; 
        const { isDark } = this.context;

        let isOwner = false;

        try { 
            const token = localStorage.getItem('token');
            const { user } = decode(token);

            if(info){
                isOwner = user._id === info._id;
            }
        } catch (err) { }

        const style = isDark? darkStyle: lightStyle;

        return(
            <div className='profile' style={style}>
                <header className='p-2 text-center'>
                    <div>
                        <img src = {imgURL? imgURL: loading} alt = 'profile pic'/> 
                    </div>
                    
                    <h3>{info ? info.username:'Loading User...'}</h3>

                    {isOwner? 
                            (
                                <div>
                                    <button className='btn-primary'>
                                        <label htmlFor='profilePic'>
                                            Update
                                        </label>
                                    </button>

                                    <input
                                        id = 'profilePic'
                                        type = 'file'
                                        onChange = {this.changeProfilePic}
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

           
                <main className='row mt-5'>
                    <div className='col-12 col-xl-3'>
                        <div className = 'stats text-center'>
                            <h2>Personal Stats</h2>
                            <p>Email: {info? info.email : 'Loading...'}</p>
                            <p># of Products Posted: {products.length}</p>
                            <p>Average product rating: {products.map(p => {
                                p.id.review
                            })}</p>
                            <p>Successful Sales: </p>
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