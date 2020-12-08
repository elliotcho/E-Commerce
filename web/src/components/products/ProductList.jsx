import React, {Component} from 'react';
import { getProductsByDepartment, deleteProduct } from '../../api/product';
import Product from './Product';

class ProductList extends Component {
    constructor(){
        super();

        this.state = {
            products: []
        }

        this.deleteProductFromList = this.deleteProductFromList.bind(this);
    }

    async componentDidMount(){
        const { dept } = this.props.match.params;

        const products = await getProductsByDepartment(dept);
        this.setState({ products });
    }

    async deleteProductFromList(id){
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

    render(){
        const { products } = this.state;

        return(
            <div>
                {products.map(p => 
                    <Product
                        key = {p._id}
                        productId = {p._id}
                        description = {p.description}
                        deleteProduct = {this.deleteProductFromList}
                        image = {p.image}
                        name = {p.name}
                        price = {p.price}
                        userId = {p.userId}
                    />
                )}
            </div>        
        )
    }
}

export default ProductList;