import React, {Component} from 'react';
import axios from 'axios';


class ProductList extends Component {
    constructor(){
        super();

        this.state = {
            products: []
        }
    }

    async componentDidMount(){
        const response = await axios.get('http://localhost:5000/api/product/department/woo');
        this.setState({products: response.data});
    }

    render(){
        const {products} = this.state;

        return(
            <div>
                {products.map(p => 
                    <div key = {p._id}>
                        <div>
                            {p.productName}
                        </div>

                        <strong>{p.datePosted}</strong>
                    </div>
                )}
            </div>        
        )
    }
}

export default ProductList;