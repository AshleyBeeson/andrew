import React from 'react';

export default class DeleteBugBtn extends React.Component{

	onClick(){

	}

	render(){
		return(
			<div>
				<button type="button" className="btn btn-danger btn-sm" onClick={this.onClick.bind(this)}>Delete</button>
			</div>
		);
	}
}