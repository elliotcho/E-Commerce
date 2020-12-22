import React, {Component} from 'react';
import decode from 'jwt-decode';
import { getProductById, deleteProduct } from '../../api/product';
import loading from '../../images/loading.jpg';
import './css/ProductDetails.css';

class ProductDetails extends Component{
    constructor(){
        super();

        this.state = {
            product: {},
            fetching: false,
        }

        this.removeProduct = this.removeProduct.bind(this);
    }

    async componentDidMount(){
        const { id } = this.props.match.params;

        const product = await getProductById(id);
    
        this.setState({ product, fetching: true });
    }

    async removeProduct(){
        const { product: { _id } } = this.state;
        await deleteProduct(_id);

        this.props.history.goBack();
    }

    render(){
        const { product: { 
            image, name, price, description, datePosted, userId
        } } = this.state;

        let isOwner = false;

        try { 
            const token = localStorage.getItem('token');
            const { user } = decode(token);

            isOwner = user._id === userId;
        } catch (err) { }

        return(
            <div className = 'product-details-bg'>
                <div className = 'product-details p-4'>
                    {this.state.fetching? 
                        (<div className = 'row'>
                            <div className = 'col-5'>
                                <img src = {image? image: loading} alt = 'product pic' />

                                <p className = 'mt-3 ml-3'>
                                    { new Date(datePosted).toLocaleString() }
                                </p>
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

                                <p className = 'content'>
                                    {description.content}
                                </p>

                                <div className='mt-5 text-right'>
                                    <i className='fas fa-cart-plus'/>
                                </div>
                            </div>
                        </div>) : null
                    }
                </div>
            </div>
        )
    }
}

export default ProductDetails;