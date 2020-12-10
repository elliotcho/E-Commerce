import React, { Component } from 'react';
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

    handleSubmit(e){
        e.preventDefault();
    }

    render(){
        const { query } = this.state;

        return(
            <form className='search-bar' onSubmit={this.handleSubmit}>
                <input
                    type = 'text'
                    onChange = {this.handleChange}
                    placeholder = 'Search'
                    name = {query}
                />
            </form>
        )
    }
}

export default Searchbar;