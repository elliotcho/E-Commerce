import React, {Component} from 'react';
import axios from 'axios';

import './css/CreateProduct.css';

class CreateProduct extends Component {
    constructor(){
        super();

        this.state = {
            price: null,
            productName: '',
            departmentId: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();
        await axios.post('http://localhost:5000/api/product', this.state);
    }

    render(){
        const {price, productName, departmentId} = this.state;

        return(
            <div className='createProduct'>
                <form onSubmit={this.handleSubmit}>
                    <h1>List Your Product</h1>
                    <label htmlFor="productName">Product Name</label>
                    <input 
                        name='productName'
                        value={productName}
                        onChange={this.handleChange}
                        type='text'
                        required
                    />
                    <label htmlFor="departmentId">Department ID</label>
                    <input 
                        name='departmentId'
                        value={departmentId}
                        onChange={this.handleChange}
                        type="text"
                        required
                    />
                    <label htmlFor="price">Price</label>
                    <input 
                        name='price'
                        value={price}
                        onChange={this.handleChange} 
                        type="number" 
                        placeholder='$'
                        required
                    />
                    <button className='btn btn-block btn-outline-primary' style={{verticalAlign:'middle'}}>
                        <span>Create </span></button>
                </form>
            </div>
        );
    }
}

export default CreateProduct;
