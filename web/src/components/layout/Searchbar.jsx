import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
        const { history } = this.props;

        history.push(`/products/all/${query}`);
    }

    render(){
        const { query } = this.state;

        return(
            <form className='search-bar' onSubmit={this.handleSubmit}>
                <input
                    className = 'form-control'
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

export default withRouter(Searchbar);