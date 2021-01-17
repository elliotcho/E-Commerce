import React, {Component} from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { validateProductForm } from '../../utils/validateForm';
import { createProduct, updateProductQuantity } from '../../api/product';
import { getAllDepartments } from '../../api/departments';
import QuantityForm from './QuantityForm';
import './css/CreateProduct.css';

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

        if(!validateProductForm(this.state)){
            return;
        }
        
        const { name, departmentId, description, image, price, quantity } = this.state;
        const { history } = this.props;

        const formData = new FormData();
        
        formData.append('name', name);
        formData.append('departmentId', departmentId);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('price', price);    

        const product = await createProduct(formData);
        const { _id } = product;

        await updateProductQuantity(_id, quantity);

        history.push(`/product/${_id}`);
    }

    render(){
        const { name, price, departmentId, departments } = this.state;
        const { isDark } = this.context;

        const style = isDark? darkStyle: lightStyle;
        
        let borderStyle = { border: '1px solid black' }; 

        if(isDark){
            borderStyle = { border: '1px solid white' };
        }

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

                    <input
                        type = 'number'
                        name = 'price'
                        placeholder='Price of a single item'
                        onChange = {this.changeField}
                        value = {price}
                        step = '0.01'
                        min = '0'
                    />

                    <select onChange={this.changeField} value={departmentId} name='departmentId'>
                        <option value="">Select Department </option>

                        {departments.map(dept => 
                            <option value={dept._id} key={dept._id}>
                                {dept.name}
                            </option>
                         )}
                    </select>

                    <textarea
                        type = 'textarea'
                        name = 'description'
                        placeholder = 'Product description'
                        onChange = {this.changeField}
                    />
                    
                    <input
                        type = 'file'
                        className = 'file'
                        onChange = {this.changeImage}
                        style = {borderStyle}
                        accept = 'jpg jpeg png'
                    />

                    <QuantityForm updateQuantity={this.updateQuantity}/>
                    
                    <button className='btn-block'>POST</button>
                </form>
            </div>
        );
    }
}

export default CreateProduct;
