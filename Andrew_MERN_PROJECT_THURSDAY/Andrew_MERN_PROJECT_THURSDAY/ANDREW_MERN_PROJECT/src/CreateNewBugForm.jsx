import React from 'react';
import * as BugActions from './actions/BugActions';
import BugStore from './store/BugStore';

export default class CreateNewBugForm extends React.Component{

	constructor(){
		super();
		this.state = {
			id: this.getID(),
			issueID: "",
			dateCreated: "",
			summary: "",
			description: "",
			highPriority: false,
			severity: "",
			reporter: "",
			assignedUser: "",
			actions: [],
			status: "select"
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	componentDidMount(){
		let today = new Date(Date.now()).toLocaleString();
		this.setState({dateCreated: today});
	}

	handleChange(e){
		const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name] : value}, () =>{
        	console.log(value);
        	console.log(name);
        });
	}

	handleSubmit(e){
		e.preventDefault();


		let bugPayload = [
		this.state.id,
		this.state.issueID, this.state.dateCreated,
		this.state.summary,this.state.description,
		this.state.highPriority.toString().toUpperCase(),this.state.severity,this.state.reporter,
		this.state.assignedUser,
		this.state.status];
		console.log(bugPayload);
		BugActions.createNewBug(bugPayload);
	}

	getID(){
		let bugList = BugStore.getBugData();
		return bugList.length + 1;
	}

	render(){

		console.log(this.getID());

		return(
			<form className="CNBF" onSubmit={this.handleSubmit}>
			<fieldset disabled>
				<div className="form-group row">
					<label htmlFor="CNBF-id" className="col-sm-2 col-form-label col-form-label-sm" ref="cnbf_id_ref">id:</label>
					<div className="col-sm-10">
                        <input type="text" value={this.state.id} onChange={this.handleChange} name="id" className="form-control form-control-sm" id="CNBF-id" />
                    </div>
				</div>
				</fieldset>
				<div className="form-group row">
					<label htmlFor="CNBF-issueId" className="col-sm-2 col-form-label col-form-label-sm">issueID:</label>
					<div className="col-sm-10">
                        <input type="text" value={this.state.issueID} onChange={this.handleChange} placeholder="ISSUE/BUG-XXXXX" name="issueID" className="form-control form-control-sm" id="CNBF-id" />
                    </div>
				</div>
				<fieldset disabled>
					<div className="form-group row">
						<label htmlFor="CNBF-dateCreated" className="col-sm-2 col-form-label col-form-label-sm">Date Created:</label>
						<div className="col-sm-10">
						<input type="text" className="form-control form-control-sm" id="CNBF-dateCreated" value={this.state.dateCreated} />
						</div>
					</div>
				</fieldset>
				<div className="form-group row">
                    <label htmlFor="CNBF-summary" className="col-sm-2 col-form-label col-form-label-sm">summary</label>
                    <div className="col-sm-10">
                        <input type="text" value={this.state.summary} onChange={this.handleChange} name="summary" className="form-control form-control-sm" id="CNBF-summary" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="CNBF-description" className="col-sm-2 col-form-label col-form-label-sm">description</label>
                    <div className="col-sm-10">
                        <input type="text" value={this.state.description} onChange={this.handleChange} name="description" className="form-control form-control-sm" id="CNBF-description" />
                    </div>
                </div>
                <div className="form-group row">
                   <label htmlFor="CNBF-hp" className="col-sm-2 col-form-label col-form-label-sm">
			          High Priority:
			         </label>
			         <div className="col-sm-1">
			         <input
			            name="highPriority"
			            type="checkbox"
			            checked={this.state.highPriority}
			            onChange={this.handleChange} 
			            className="form-control form-control-sm"
			            id="CNBF-hp" />
			        </div>
			        
                </div>

                <div className="form-check form-check-inline">
             		Severity:
             		<label className="radio-inline">Low<input type="radio" name="severity" value="LOW" onChange={this.handleChange} id="CNBF-low"/></label>
					<label className="radio-inline">Medium<input type="radio" name="severity" value="MEDIUM" onChange={this.handleChange} id="CNBF-med"/></label>
					<label className="radio-inline">High<input type="radio" name="severity" value="HIGH" onChange={this.handleChange} id="CNBF-high" /></label>
	            </div>
                <div className="form-group row">
                    <label htmlFor="CNBF-reporter" className="col-sm-2 col-form-label col-form-label-sm">reporter</label>
                    <div className="col-sm-10">
                        <input type="text" value={this.state.reporter} onChange={this.handleChange} name="reporter" className="form-control form-control-sm" id="CNBF-reporter" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="CNBF-assignedUser" className="col-sm-2 col-form-label col-form-label-sm">assigned user</label>
                    <div className="col-sm-10">
                        <input type="text" value={this.state.assignedUser} onChange={this.handleChange} name="assignedUser" className="form-control form-control-sm" id="CNBF-assignedUser" />
                    </div>
                </div>

                <div className="form-group row">
                Status:
	                <select id="CNBF-dropdown" name="status" onChange={this.handleChange} value={this.state.status}>
	                  <option value="select">Select</option>
	                  <option value="TO DO">To Do</option>
	                  <option value="IN PROGRESS">In Progress</option>
	                  <option value="IN REVIEW">In Review</option>
	                  <option value="IN TEST">In Test</option>
	                  <option value="IN DEMO">In Demo</option>
	                  <option value="DONE">DONE</option>
	               	</select>
	            </div>
				 <input type="submit" value="Submit" />				
			</form>
		);
	}

}