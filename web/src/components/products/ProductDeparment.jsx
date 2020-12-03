import React, {Component} from 'react';
import axios from 'axios';


class ProductDepartment extends Component {
    constructor(){
        super();

        this.state = {
            sameDepartment: null
        }
    }

    async componentDidMount(){
        const response = await axios.get('http://localhost:5000/api/product/department/woo');
        const department = response.data;
  
        this.setState({sameDepartment:department});
    }

    render(){
            const {sameDepartment} = this.state;
            console.log(sameDepartment);
        return(
            <div>
                
            </div>
        )
    }
}

export default ProductDepartment;