import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getAllDepartments } from '../../api/departments';
import './css/Searchbar.css';

class Searchbar extends Component{
    constructor(){
        super();

        this.state = {
            departments: [],
            query: '',
            dept: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async componentDidMount(){
        const departments = await getAllDepartments();
        this.setState({ departments });
    }

    componentDidUpdate(prevProps){
      const { pathname } = this.props.location;
      
      const prevPathname = prevProps.location.pathname;

      if(pathname !== prevPathname && !pathname.startsWith('/products')){
          this.setState({ query: '', dept: '' });
      }
    }

    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();

        const { query, dept } =this.state;
        const { history } = this.props;

        let route;

        if(dept) {
            route = `/products/${dept.toLowerCase()}/${query}`;
        } else{
            route = `/products/all/${query}`;
        }

        history.push(route);
    }

    render(){
        const { query, dept, departments } = this.state;

        return(
            <form className='search-bar' onSubmit={this.handleSubmit}>
               <div className='row ml-2'>
                    <div className='col-2 m-0 p-0'>
                        <select onChange={this.handleChange} value={dept} name='dept'>
                            <option value="">all</option>

                            {departments.map(dept => 
                                <option value={dept.name} key={dept._id}>
                                    {dept.name}
                                </option>
                            )}
                        </select>
                    </div>

                    <div className='col-10'>
                        <input
                            className = 'form-control'
                            type = 'text'
                            name = 'query'
                            onChange = {this.handleChange}
                            placeholder = 'Search'
                            value ={query}
                        />
                    </div>
               </div>
            </form>
        )
    }
}

export default withRouter(Searchbar);