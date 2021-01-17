import React, { Component } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getProductsByDepartment, searchProducts } from '../../api/product';
import Product from './Product';
import './css/ProductList.css';

const lightStyle = { backgroundColor: '#9ad3bc' };
const darkStyle = { backgroundColor: '#34626c' };

class ProductList extends Component {
    static contextType = ThemeContext;

    constructor(){
        super();

        this.state = {
            products: []
        }

        this.fetchProducts = this.fetchProducts.bind(this);
    }

    async componentDidMount(){
        this.setState({ products: await this.fetchProducts() });
    }

    async componentDidUpdate(prevProps){
        const { dept, query } = this.props.match.params;

        const prevDept = prevProps.match.params.dept;
        const prevQuery = prevProps.match.params.query;

        if(dept !== prevDept || query !== prevQuery){
            this.setState({ products: await this.fetchProducts() });
        }
    }

    async fetchProducts(){
        const { dept, query } = this.props.match.params;

        let products = [];

        if(query){
            products = await searchProducts({ dept, query });
        } else {
            products = await getProductsByDepartment(dept);
        }

        return products;
    }

    render(){
        const { products } = this.state;
        const { isDark } = this.context;

        const style = isDark? darkStyle: lightStyle;

        return(
            <div className = 'product-list d-flex justify-content-center' style={style}>
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
        )
    }
}

export default ProductList;