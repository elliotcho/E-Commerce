import React, {Component} from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { createErrorToast } from '../../utils/createToast';
import { createProduct, updateProductQuantity } from '../../api/product';
import { getAllDepartments } from '../../api/departments';
import QuantityForm from './QuantityForm';
import './css/CreateProduct.css';
import { parse } from 'ipaddr.js';

const lightStyle = { backgroundColor: '#9ad3bc', color: '#3f3e3e' };
const darkStyle = { backgroundColor: '#34626c', color: 'white' };

class CreateProduct extends Component {
    static contextType = ThemeContext;

    constructor(){
        super();

        this.state = {
            departments: [],
            departmentId: '',
            name: '',
            description: '',
            price: '',
            image: null,
            quantity: {}
        }

        this.changeField = this.changeField.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    async componentDidMount(){
        const departments = await getAllDepartments();
        this.setState({ departments });
    }
    
    changeField(e){
        this.setState({[e.target.name] : e.target.value});
    }

    changeImage(e){
        this.setState({image: e.target.files[0]});
    }

    updateQuantity(quantity){
        this.setState({ quantity });
    }

    async handleSubmit(e){
        e.preventDefault();

        if(!this.validateForm()){
            return;
        }
        
        alert("HI")
        // const { name, departmentId, description, image, price, quantity } = this.state;
        // const { history } = this.props;

        // const formData = new FormData();
        
        // formData.append('name', name);
        // formData.append('departmentId', departmentId);
        // formData.append('description', description);
        // formData.append('image', image);
        // formData.append('price', price);    

        // const product = await createProduct(formData);
        // const { _id } = product;

        // await updateProductQuantity(_id, quantity);

        // history.push(`/product/${_id}`);
    }

    validateForm(){
        const { name, departmentId, description, price, quantity } = this.state;

        let msg;

        if(name.trim().length === 0){
            msg = 'Name cannot be blank';
        } else if(!departmentId){
            msg = 'You must select a department!';
        }  else if(!price || Number(price) === 0){
            msg = 'You cannot sell an item for free';
        } else if(description.trim().length === 0){
            msg = 'A description is required';
        } else {        
            let sum = 0;

            Object.keys(quantity).forEach(s => sum += parseInt(quantity[s]));

            if(sum === 0) msg = 'You cannot sell something with 0 quantity';
        }

        if(msg){
            createErrorToast(msg);
            return false;
        }

        return true;
    }

    render(){
        const { name, price, departmentId, departments } = this.state;
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
                        <option value="">Select Department </option>

                        {departments.map(dept => 
                            <option value={dept._id} key={dept._id}>
                                {dept.name}
                            </option>
                         )}
                    </select>

                    <input
                        type = 'number'
                        name = 'price'
                        placeholder='Price of a single item'
                        onChange = {this.changeField}
                        value = {price}
                        step = '0.01'
                        min = '0'
                    />

                    <input
                        type = 'file'
                        className = 'file'
                        onChange = {this.changeImage}
                        accept = 'jpg jpeg png'
                    />

                    <textarea
                        type = 'textarea'
                        name = 'description'
                        placeholder = 'Product description'
                        onChange = {this.changeField}
                    />

                    <QuantityForm updateQuantity={this.updateQuantity}/>
                    
                    <button className='btn-block'>POST</button>
                </form>
            </div>
        );
    }
}

export default CreateProduct;