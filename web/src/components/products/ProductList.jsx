import React, {Component} from 'react';
import { getProductsByDepartment } from '../../api/product';
import Product from './Product';

class ProductList extends Component {
    constructor(){
        super();

        this.state = {
            products: []
        }
    }

    async componentDidMount(){
        const { dept } = this.props.match.params;

        const products = await getProductsByDepartment(dept);
        this.setState({ products });
    }

    render(){
        const { products } = this.state;

        return(
            <div>
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
        )
    }
}

export default ProductList;