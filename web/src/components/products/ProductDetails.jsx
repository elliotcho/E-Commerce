import React, {Component} from 'react';
import { getProductById } from '../../api/product';
import './css/ProductDetails.css';

class ProductDetails extends Component{
    constructor(){
        super();

        this.state = {
            product: {},
            fetching: false,
        }
    }

    async componentDidMount(){
        const { id } = this.props.match.params;

        const product = await getProductById(id);
        
        this.setState({ product, fetching: true });
    }

    render(){
        const { product: { 
            image, name, price, description, datePosted, userId
        } } = this.state;

        return(
            <div className = 'product-details-bg'>
                <div className = 'product-details p-4'>
                    {this.state.fetching? 
                        (<div className = 'row'>
                            <div className = 'col-5'>
                                <img src = {image} alt = 'product pic' />

                                <p className = 'mt-3 ml-3'>
                                    { new Date(datePosted).toLocaleString() }
                                </p>
                            </div>

                            <div className = 'col-7 description'>
                                <h1 className = 'name'>
                                    {name}
                                </h1>

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