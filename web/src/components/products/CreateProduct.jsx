import React, {Component} from 'react';
import { createProduct } from '../../api/product';
import './css/CreateProduct.css';

class CreateProduct extends Component {
    constructor(){
        super();

        this.state = {
            name: '',
            departmentId: '',
            description: {},
            image: null,
            price: 0
        }

        this.changeField = this.changeField.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    changeField(e){
        this.setState({[e.target.name] : e.target.value});
    }

    changeDescription(e){
        const { description } = this.state;

        description[e.target.name] = e.target.value;

        this.setState( { description });
    }

    changeImage(e){
        this.setState({image: e.target.files[0]});
    }

    async handleSubmit(e){
        e.preventDefault();
        const { name, departmentId, description, image, price } = this.state;

        const formData = new FormData();

        for(let key in description){
            formData.append(key, description[key]);
        }
        
        formData.append('name', name);
        formData.append('departmentId', departmentId);
        formData.append('image', image);
        formData.append('price', price);

        await createProduct(formData);

        this.props.history.push(`/products/${departmentId}`);
    }

    render(){
        const { name, price, departmentId } = this.state;

        return(
            <div className='create-product'>
                <form onSubmit = {this.handleSubmit}>
                    <input
                        type = 'text'
                        name = 'name'
                        placeholder = 'Product name...'
                        onChange = {this.changeField}
                        value = {name}
                    />

                    <input
                        type = 'text'
                        name = 'departmentId'
                        placeholder ='Department...'
                        onChange = {this.changeField}
                        value = {departmentId}
                    />

                    <input
                        type = 'number'
                        name = 'price'
                        min = '0'
                        step = '0.01'
                        onChange = {this.changeField}
                        value = {price}
                    />

                    <input
                        type = 'file'
                        onChange = {this.changeImage}
                        accept = 'jpg jpeg png'
                    />

                    <input
                        type = 'text'
                        name = 'content'
                        placeholder = 'Description...'
                        onChange = {this.changeDescription}
                    />

                    <input 
                        type = 'text'
                        name = 'color'
                        placeholder = 'Color...'
                        onChange = {this.changeDescription}
                    />

                    <input
                        type = 'text'
                        name = 'size'
                        placeholder = 'Size...'
                        onChange = {this.changeDescription}
                    />

                    <input
                        type = 'text'
                        name = 'brand'
                        placeholder = 'Brand...'
                        onChange = {this.changeDescription}
                    />

                    <button>Submit Product</button>
                </form>
            </div>
        );
    }
}

export default CreateProduct;
