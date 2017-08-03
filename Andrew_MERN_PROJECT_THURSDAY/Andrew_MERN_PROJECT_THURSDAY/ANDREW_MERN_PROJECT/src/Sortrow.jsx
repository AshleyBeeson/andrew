import React from 'react';
import * as BugActions from './actions/BugActions';

export default class Sortrow extends React.Component{
	
	constructor(){
		super();
		this.state = {
			isAZReq: false
		};
		this.handleChange = this.handleChange.bind(this)
		this.handleAZClick = this.handleAZClick.bind(this);
	}

	handleChange(e){
		this.props.textChange(e.target.value);
	}

	handleAZClick(){
		this.setState({isAZReq: !(this.state.isAZReq)}, () => {
			console.log("click");
			console.log(this.state.isAZReq);
			//BugActions.setAZList(this.state.isAZReq);
		});
	}
	
	render(){
		return(
		<div className="card">
	       	<div className="card-header h-20">
	       		<div className="col-sm-4">
	       			
	       		</div>
	       		<div className="col-sm-4">
	       			
	       		</div>
	       		<div className="col-sm-1">
	       			<span className="badge badge-pill badge-default" onClick={this.handleAZClick}>a-z</span>
	       		</div>
	       		<div className="col-sm-3">
	       			<input type="text" className="form-control form-control-sm" onChange={this.handleChange} value={this.props.searchText} placeholder="Search summary"/>
	       		</div>
	       	</div>
	    </div>
		
		);
	}
}