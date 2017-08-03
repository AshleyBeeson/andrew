import React from 'react';
import * as BugActions from './actions/BugActions';
import BugStore from './store/BugStore';

export default class EditBug extends React.Component{

	constructor(){
		super();
		this.state = {
			bugDOMForm: [],
			actionDOMForm: [],
			bugData: "",
			id: "",
			issueId: "",
			dateCreated: "",
			summary: "",
			description: "",
			highPriority: "",
			severity: "",
			reporter: "",
			assignedUser: "",
			actions: [],
			status: "select",
			isError: false,
			errors: ""
		};
		this._onChange = this._onChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentWillMount(){
		BugStore.on("singleBugEv", this._onChange);
	}

	componentWillUnmount(){
		BugStore.removeListener("singleBugEv", this._onChange);
	}

	componentDidMount(){
		BugActions.getBugDetails(this.props.params.bugid);
	}

	_onChange(){
		console.log("event recieved");
		this.getBugAndRender();
	}

	handleSubmit(e){
		e.preventDefault();

		let bugPayload = [
		this.state.id,
		this.state.issueId, this.state.dateCreated,
		this.state.summary,this.state.description,
		this.state.highPriority.toString().toUpperCase(),this.state.severity,this.state.reporter,
		this.state.assignedUser,
		this.state.status];
		//console.log(this.state.issueID);
		console.log(bugPayload);

		let issueId = bugPayload[1];
		if( issueId.includes("ISSUE") != true || issueId.includes("BUG") != true){
			console.log(issueId);
			let error = this.state.errors;
			error = error+" IssueId must be 'ISSUE-\/BUG-' format";
			this.setState({errors: error});
			this.setState({isError: true});
		}
		if( issueId.includes("ISSUE") == true || issueId.includes("BUG") == true){
			this.setState({isError: false});
			this.setState({errors: ""});
			BugActions.editBugDetails(this.props.params.bugid, bugPayload);
		}
		
	}

	handleChange(e){
		const target = e.target;
		const value = target.value;
		const name = target.name;
		
		this.setState({[name] : value}, () =>{
			console.log(name+":"+value);
        });
	}

	getBugAndRender(){
		let bugObjFromAPI = BugStore.getSingleBugData();
		this.setState({bugData: bugObjFromAPI});
/*		console.log(bugObjFromAPI);
*/		let reqDomForm = [];
		let reqActionForm = [];
		let count = 0;
		for(let key in bugObjFromAPI){
			//console.log(bugObjFromAPI[key]);
			//let divkey = this.props.params.bugid+{count};
			let objName = key;
			let objValue = bugObjFromAPI[key];
			let htmlF = "edit-"+objName;
			//console.log(objValue);
			if(count>=1 && key != "actions"){
				this.setState({[objName]: objValue}, () => {
					console.log(objName);
				});

				reqDomForm.push(
					<div className="form-group row" key={count}>
						<label htmlFor={htmlF} className="col-sm-2 col-form-label col-form-label-sm">{objName}: </label>
						<div className="col-sm-10">
	                        <input type="text" placeholder={objValue} onChange={this.handleChange} className="form-control form-control-sm" name={objName} id={htmlF} />
	                    </div>
					</div>
				);

			}

			if(key == "actions"){
				let actionArray = objValue;
				for(let i = 0; i<actionArray.length; i++){
					let action = actionArray[i].action;
					let dateCreated = actionArray[i].dateCreated;
					let user = actionArray[i].user;
					let divkey = count+i;

					reqActionForm.push(
						<div className="edit-actiongroup" key={divkey}> 
							<div className="form-group row" >
								<label htmlFor={htmlF} className="col-sm-2 col-form-label col-form-label-sm">Action: </label>
								<div className="col-sm-10">
		                        	<input type="text" placeholder={action} className="form-control form-control-sm" id={htmlF} />
		                    	</div>
							</div>
							<div className="form-group row" >
								<label htmlFor={htmlF} className="col-sm-2 col-form-label col-form-label-sm">Date Created: </label>
								<div className="col-sm-10">
		                        	<input type="text" placeholder={dateCreated} className="form-control form-control-sm" id={htmlF} />
		                    	</div>
							</div>
							<div className="form-group row" >
								<label htmlFor={htmlF} className="col-sm-2 col-form-label col-form-label-sm">User: </label>
								<div className="col-sm-10">
		                        	<input type="text" placeholder={user} className="form-control form-control-sm" id={htmlF} />
		                    	</div>
							</div>
						</div>
					);
				}
			}
			count++;
		};
		this.setState({bugDOMForm: reqDomForm});
		this.setState({actionDOMForm: reqActionForm});
	}

	render(){
		const showErrorMsg = this.state.isError;

		return(
			<div className="container edit-main">
				<div className="card text-center head">
				  <div className="card-header">
				    <div className="row">
						<div className="col-sm-6">
							Bug Details: -
						</div>
						<div className="col-sm-6 ">
							Actions
						</div>
				  </div>
				</div>
				
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="edit-main">
							<form className="editform" onSubmit={this.handleSubmit.bind(this)}>
								<fieldset >
									{this.state.bugDOMForm}
								</fieldset>
								<input type="submit" value="Submit Changes" />
								{ showErrorMsg ? this.state.errors : null}
							</form>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="edit-main">
							<form className="editform" onSubmit={this.handleSubmit.bind(this)}>
								<fieldset disabled>
									{this.state.actionDOMForm}
								</fieldset>
							</form>
						</div>
					</div>
				</div>
				
			</div>
		);
	}
}