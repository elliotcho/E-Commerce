import React, { Component } from 'react';
import { searchProducts } from '../../api/product';
import './css/Searchbar.css';

class Searchbar extends Component{
    constructor(){
        super();

        this.state = {
            query: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();
        const { query } =this.state;

        const products = await searchProducts({ query, dept: 'all'});

        console.log(products);
    }

    render(){
        const { query } = this.state;

        return(
            <form className='search-bar' onSubmit={this.handleSubmit}>
                <input
                    type = 'text'
                    name = 'query'
                    onChange = {this.handleChange}
                    placeholder = 'Search'
                    value ={query}
                />
            </form>
        )
    }
}

export default Searchbar;