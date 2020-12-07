import React, {Component} from 'react';
import { getProductsByDepartment } from '../../api/product';

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
                    <div key = {p._id}>
                        <div>
                            {p.name}
                        </div>

                        <img
                            src = {p.image}
                            alt = 'product'
                            width='150'
                            height='150'
                        />
                    </div>
                )}
            </div>        
        )
    }
}

export default ProductList;