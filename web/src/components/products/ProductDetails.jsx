import React, {Component} from 'react';
import { getProductById, deleteProduct } from '../../api/product';
import Product from './Product';

class ProductDetails extends Component{
    constructor(){
        super();

        this.state = {
            product: null
        }

        this.removeProduct = this.removeProduct.bind(this);
    }

    async componentDidMount(){
        const { id } = this.props.match.params;

        const product = await getProductById(id);
        
        this.setState({ product });
    }

    async removeProduct(){
        const { id } = this.props.match.params;

        await deleteProduct(id);

        this.props.history.push('/');
    }

    render(){
        const { product } = this.state;

        return(
            <div>
                {product? 
                     (<Product
                        key = {product._id}
                        productId = {product._id}
                        description = {product.description}
                        deleteProduct = {this.removeProduct}
                        image = {product.image}
                        name = {product.name}
                        price = {product.price}
                        userId = {product.userId}
                    />) : null
                }
            </div>
        )
    }
}

export default ProductDetails;