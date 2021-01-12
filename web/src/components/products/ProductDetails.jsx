import React, { Component } from 'react';
import decode from 'jwt-decode';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getProductById, deleteProduct, addToUserCart } from '../../api/product';
import {getReviews} from '../../api/review';
import ReviewList from '../reviews/ReviewList';
import loading from '../../images/loading.jpg';
import './css/ProductDetails.css';

const lightStyle = { backgroundColor: '#9ad3bc', color: 'black' };
const darkStyle = { backgroundColor: '#34626c', color: 'white' };

class ProductDetails extends Component{
    static contextType = ThemeContext;

    constructor(){
        super();

        this.state = {
            product: {},
            fetching: false,
            rating: ''
        }

        this.getAvgRating = this.getAvgRating.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    async componentDidMount(){
        const { id } = this.props.match.params;
        const product = await getProductById(id);

        await this.getAvgRating(id);
     
        this.setState({ product, fetching: true });
    }

    async getAvgRating(){
        const { id } = this.props.match.params;

        const reviews = await getReviews(id);
        let total = 0;

        for(let i = 0 ; i < reviews.length; i++){
            total += parseInt(reviews[i].rating)
        }

        let avgRating = (total / reviews.length);

        this.setState({ rating: avgRating.toFixed(1) });
    }

    async removeProduct(){
        const { product: { _id } } = this.state;
        await deleteProduct(_id);

        this.props.history.goBack();
    }

    async addToCart(){
        const { product: { _id} } = this.state;
        await addToUserCart(_id);

        alert("ADDED TO CART");
    }


    render(){
        const { product: { 
            image, name, price, description, datePosted, userId, username, quantity, _id
        } } = this.state;
        const{rating} = this.state;

        const style = this.context.isDark? darkStyle: lightStyle;
        let isOwner = false;

        try { 
            const token = localStorage.getItem('token');
            const { user } = decode(token);

            isOwner = user._id === userId;
        } catch (err) { }

        return(
            <div className = 'product-details-bg' style={style}>
                <div className = 'product-details p-4'>
                    {this.state.fetching? 
                        (<div className = 'row'>
                            <div className = 'col-5'>
                                <img src = {image? image: loading} alt = 'product pic' />

                                <div className = 'ml-3'>
                                    <p className ='mt-3'>
                                        { new Date(datePosted).toLocaleString() }
                                    </p>
                                    
                                    <p className ='mt-3'>
                                        Posted by 
                                        
                                        <span className='ml-2' onClick={
                                                () => this.props.history.push(`/profile/${userId}`)
                                            }
                                        >
                                            {username}
                                        </span>
                                    </p>
                                    <p className='rating'>
                                        Average User Rating: {rating}/5
                                    </p>
                                </div>
                            </div>

                            <div className = 'col-7 description'>
                                <header className = 'row'>
                                    <div className ='col-10'>
                                        <h1>
                                            {name} 
                                        </h1>
                                    </div>

                                    <div className ='col-2 text-right'>
                                        {isOwner && (
                                            <i className='fas fa-trash-alt' onClick={this.removeProduct}/>
                                        )}
                                    </div>
                                </header>

                                <div className = 'price my-3'>
                                    {`Price: ${price.toFixed(2)}$`}
                                </div>

                                <div className = 'quantity'>
                                    {`Quantity remaning: ${quantity}`}
                                </div>

                                <p className = 'content'>
                                    {description.content}
                                </p>

                                <div className='mt-5 text-right'>
                                    {!isOwner && ( 
                                        <i className='fas fa-cart-plus' onClick={this.addToCart}/>
                                    )}
                                </div>
                            </div>
                        </div>) : null
                    }
                </div>
  
                <ReviewList productId={_id} getAvgRating={this.getAvgRating}/>
            </div>
        )
    }
}

export default ProductDetails;