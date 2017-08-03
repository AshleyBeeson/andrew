import React from 'react';
import * as BugActions from './actions/BugActions';

export default class DeleteBugBtn extends React.Component{

	onClick(){
		console.log(this.props._uniqueID);
		BugActions.deleteBugById(this.props._uniqueID);
	}

	render(){
		return(
			<div>
				<a href="#top"><img src="./images/delete.png" alt="delete" className="del-Img" onClick={this.onClick.bind(this)}></img></a>
				{/*<button type="button" className="btn btn-danger btn-sm" onClick={this.onClick.bind(this)}>Delete</button>*/}
			</div>
		);
	}
}