import React, {Component} from 'react';
import { getAllDepartments } from '../../api/departments';
import { createProduct } from '../../api/product';
import './css/CreateProduct.css';

class CreateProduct extends Component {
    constructor(){
        super();

        this.state = {
            departments: [],
            name: '',
            departmentId: '',
            description: {},
            image: null,
            price: '',
            quantity: ''
            
        }

        this.changeField = this.changeField.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        const departments = await getAllDepartments();
        this.setState({ departments });
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
        const { name, departmentId, description, image, price, quantity, quantitySold } = this.state;
        const { history } = this.props;

        const formData = new FormData();

        for(let key in description){
            formData.append(key, description[key]);
        }
        
        formData.append('name', name);
        formData.append('departmentId', departmentId);
        formData.append('image', image);
        formData.append('price', price);
        formData.append('quantity', quantity);
        

        const product = await createProduct(formData);

        history.push(`/product/${product._id}`);
    }

    render(){
        const { name, price, departmentId, departments, quantity } = this.state;

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

                    <select  onChange={this.changeField} value={departmentId} name='departmentId'>
                        <option value="" disabled selected>Select Department </option>

                        {departments.map(dept => 
                            <option value={dept._id} key={dept._id}>
                                {dept.name}
                            </option>
                         )}
                    </select>

                    <input
                        type = 'number'
                        name = 'price'
                        min = '0'
                        step = '0.01'
                        onChange = {this.changeField}
                        value = {price}
                        placeholder='price of a single item...'
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

                    <input
                        type = 'number'
                        name = 'quantity'
                        value= {quantity}
                        placeholder='quantity in stock...'
                        onChange= {this.changeField}
                        />
                    
                    <button>Submit Product</button>
                </form>
            </div>
        );
    }
}

export default CreateProduct;
