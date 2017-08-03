import React from 'react';
import * as BugActions from './actions/BugActions';

export default class Searchbox extends React.Component{
	
	constructor(){
		super();
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(e){
		this.props.textChange(e.target.value);
	}

	render(){
		return(
	   		<div>
	   			<input type="text" className="form-control form-control-sm" onChange={this.handleChange} value={this.props.searchText} placeholder="Search summary"/>
	   		</div>	
		);
	}
}