import React, {Component} from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getAllDepartments } from '../../api/departments';
import { createProduct } from '../../api/product';
import './css/CreateProduct.css';

const lightStyle = { backgroundColor: '#9ad3bc', color: '#3f3e3e' };
const darkStyle = { backgroundColor: '#34626c', color: 'white' };

class CreateProduct extends Component {
    static contextType = ThemeContext;

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
        const { name, departmentId, description, image, price, quantity } = this.state;
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
        const { isDark } = this.context;

        const style = isDark? darkStyle: lightStyle;

        return(
            <div className='create-product' style={style}>
                <h1>List Your Product</h1>
                <form onSubmit = {this.handleSubmit}>
                    <input
                        type = 'text'
                        name = 'name'
                        placeholder = 'Product title'
                        onChange = {this.changeField}
                        value = {name}
                    />

                    <select onChange={this.changeField} value={departmentId} name='departmentId'>
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
                        placeholder='Price of a single item'
                    />

                    <input
                        className = 'file'
                        type = 'file'
                        onChange = {this.changeImage}
                        accept = 'jpg jpeg png'
                    />

                    <textarea
                        maxLength = '499'
                        type = 'textarea'
                        name = 'content'
                        placeholder = 'Description'
                        onChange = {this.changeDescription}
                    />

                    <input 
                        type = 'text'
                        name = 'color'
                        placeholder = 'Color'
                        onChange = {this.changeDescription}
                    />

                    <input
                        type = 'text'
                        name = 'size'
                        placeholder = 'Size'
                        onChange = {this.changeDescription}
                    />

                    <input
                        type = 'text'
                        name = 'brand'
                        placeholder = 'Brand'
                        onChange = {this.changeDescription}
                    />

                    <input
                        type = 'number'
                        name = 'quantity'
                        value= {quantity}
                        min = '0'
                        step = '1'
                        placeholder='Quantity of stock'
                        onChange= {this.changeField}
                    />
                    
                    <button className='btn-block'>POST</button>
                </form>
            </div>
        );
    }
}

export default CreateProduct;
