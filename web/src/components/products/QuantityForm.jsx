import React, { Component } from 'react';

class QuantityForm extends Component{
    constructor(){
        super();

        this.state = {
            quantity: {}
        }

        this.changeQuantity = this.changeQuantity.bind(this);
    }

    changeQuantity(e){
        const { quantity } = this.state;

        quantity[e.target.name] = e.target.value;

        this.props.updateQuantity(quantity);
        this.setState({ quantity });
    }

    render(){
        return(
            <>
                <input
                    type = 'number'
                    name = 'XS'
                    placeholder= "Quantity of XS Product"
                    onChange = {this.changeQuantity}
                    min = '0'
                />

                <input
                    type = 'number'
                    name = 'S'
                    placeholder= "Quantity of S Product"
                    onChange = {this.changeQuantity}
                    min = '0'
                />

                <input
                    type = 'number'
                    name = 'M'
                    placeholder= "Quantity of M Product"
                    onChange = {this.changeQuantity}
                    min = '0'
                />

                <input
                    type = 'number'
                    name = 'L'
                    placeholder= "Quantity of L Product"
                    onChange = {this.changeQuantity}
                    min = '0'
                />

                  <input
                    type = 'number'
                    name = 'XL'
                    placeholder= "Quantity of XL Product"
                    onChange = {this.changeQuantity}
                    min = '0'
                /> 
            </>
        )
    }
}

export default QuantityForm;