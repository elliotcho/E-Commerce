import React, { Component } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { createSuccessToast } from '../../utils/createToast';
import { decodeUser } from '../../utils/decodeUser';
import * as productAPI from '../../api/product';
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
            rating: 'Loading...',
            cache: {},
            quantity: 'Loading...',
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            sizeIdx: 0,
        }

        this.getAvgRating = this.getAvgRating.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.toProfile = this.toProfile.bind(this);
        this.updateSize = this.updateSize.bind(this);
    }

    async componentDidMount(){
        const { id } = this.props.match.params;
        const { getProductById, getProductQuantities } = productAPI; 
    
        const cache = await getProductQuantities(id);
        const product = await getProductById(id);
    
        await this.getAvgRating(id);
     
        this.setState({ 
            quantity: cache['XS'],
            product, 
            cache 
        });
    }

    async getAvgRating(){
        const { id } = this.props.match.params;
      
        const reviews = await getReviews(id);
        let total = 0;

        for(let i=0;i<reviews.length;i++){
            total += parseInt(reviews[i].rating)
        }
        
        let avgRating;

        if(reviews.length !== 0){
            avgRating = (total / reviews.length);
            avgRating = avgRating.toFixed(1);
            avgRating = `${avgRating}/5`;
        } else{
            avgRating = 'N/A';
        }

        this.setState({ rating: avgRating });
    }

    async removeProduct(){
        const { product: { _id } } = this.state;
        const { deleteProduct } = productAPI;

        await deleteProduct(_id);

        this.props.history.goBack();
    }

    async addToCart(){
        const { product: { _id} } = this.state;
        const { addToUserCart } = productAPI;

        const{size} = this.state;
        const data = {size,_id};
        await addToUserCart(data);

        createSuccessToast("ADDED TO CART");
    }

    formatDate(date){
        const dateStr = new Date(date).toLocaleString();
        const split = dateStr.split(",");

        if(split[0] === 'Invalid Date'){
            return 'Loading...';
        }

        return split[0];
    }

    toProfile(){
        const { product: { userId } } = this.state;
        const { history } = this.props;

        const route = `/profile/${userId}`;

        history.push(route);
    }

    updateSize(sizeIdx){
        const { cache, sizes } = this.state;

        const quantity = cache[sizes[sizeIdx]];

        this.setState({ sizeIdx, quantity });
    }

    //image, name, price, description, datePosted, username, 
    //sizes, quantity

    render(){
        const { product: { 
            image, name, price, description, datePosted, userId, username, _id
        } } = this.state;
     
        const style = this.context.isDark? darkStyle: lightStyle;

        const user = decodeUser();
        let isOwner = user && user._id === userId;

        return(
            <div className = 'product-details-bg' style={style}>
                <div className = 'product-details p-4'>
                    <aside>
                        <img src={image? image: loading} alt='product pic' />

                         <div className='mt-3'>
                             <p>Average Rating: {this.state.rating}</p>
                             <p>Posted on {this.formatDate(datePosted)}</p>
                             
                             <p onClick={this.toProfile}>
                                 Posted by <span>{username || 'Loading...'}</span>
                             </p>
                         </div>
                    </aside>
                    
                    <div>       
                        <header className='row'>
                            <div className='col-10'>
                                <h1>{name || 'Loading...'}</h1>
                            </div>

                            <div className='col-2 text-right'>
                                {isOwner && <i className='fas fa-trash-alt' onClick={this.removeProduct} />}
                                {!isOwner && <i className='fas fa-cart-plus' onClick={this.addToCart} />}
                            </div>
                        </header>

                        <main className='row mt-4'>
                            <p>{description}</p>
                        </main>

                        <footer className='mt-4'>
                            <div>        
                                {this.state.sizes.map((size, i) =>  {
                                    let className = 'size-box';

                                    if(this.state.sizeIdx === i){
                                        className += ' active';
                                    }

                                    const onClick = () => this.updateSize(i);

                                    return (
                                        <div key={i} className={className} onClick={onClick}>
                                            {size}
                                        </div>
                                    )
                                })}
                            </div>

                            <div className='mt-3 quantity'>
                                <p>Price per quantity: ${price}</p>
                                <p>Quantity: {this.state.quantity}</p>
                            </div>
                        </footer>
                    </div>
                </div>

                <ReviewList productId={_id} getAvgRating={this.getAvgRating}/>
            </div>
        )
    }
}

export default ProductDetails;