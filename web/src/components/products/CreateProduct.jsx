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
            price: 0
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
        const { name, departmentId, description, image, price } = this.state;
        const { history } = this.props;

        const formData = new FormData();

        for(let key in description){
            formData.append(key, description[key]);
        }
        
        formData.append('name', name);
        formData.append('departmentId', departmentId);
        formData.append('image', image);
        formData.append('price', price);

        await createProduct(formData);

        history.push(`/products/${departmentId}`);
    }

    render(){
        const { name, price, departmentId, departments } = this.state;

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

                    <select onChange={this.changeField} value={departmentId} name='departmentId'>
                        <option value=""></option>

                        {departments.map(dept => 
                            <option value={dept._id}>
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
