import React from 'react';
import DeleteBugBtn from './DeleteBugBtn';
import { Link } from 'react-router';
export default class Bug extends React.Component{

	//pass bug down as prop :)
	constructor(){
		super();
		this.state = {
			showHPImg:false,
			actionDOMObj: []
		}
	}

	componentDidMount(){
		if(this.props.bugData.highPriority === "TRUE"){
			this.setState({showHPImg: true});
		}

	}



	render(){
		//from prop
		let bug = this.props.bugData;
		let curID = bug.id;
		let curIssue = bug.issueId;
		let curDateCreated = bug.dateCreated;
		let curActions = bug.actions;
		let curSummary = bug.summary;
		let curDesc = bug.description;
		let curAssignedUser = bug.assignedUser;
		let curReporter = bug.reporter;
		let curSev = bug.severity;
		let curHPriority = bug.highPriority;
		let curStatus = bug.status

		let parsedDate = (dateStr) => {
			let dateArr = dateStr.split("T");
			return dateArr[0];
		};

		const makeActionList = (actionsFromProp) => {
			let actionDOMList = [];

			if(actionsFromProp.length > 0){
				for(let i = 0; i< actionsFromProp.length; i++){
					let curActionArray = actionsFromProp[i];
					let divKey = "action-" + i;
					console.log(curActionArray);
					actionDOMList.push(
						<div key={divKey} className="row">
							<li>{curActionArray.user}</li>
							<li>{curActionArray.dateCreated}</li>
							<li>{curActionArray.action}</li>
						</div>
					);
				};
			}
			//console.log(actionDOMList);
			return actionDOMList;
		}

		const showAlert = this.state.showHPImg;
		/*console.log(parsedDate());*/
		let coll_cn = "bug-collapsible-"+this.props.bugData._id;
		let coll_target = "#"+coll_cn;





		return(
				<div className="card bug-card">
                    <div className="card-block">
	                    <div className="row">
	                        <div className="col-sm-1 bug-card-left">
	                            {showAlert ? (
	                                <img src="./images/highPriority.png" alt="hp" className="hp-Img"></img>
	                            ) : (
	                                null
	                            )}
	                        </div>
	                        <div className="col-sm-9">
	                             <p className="card-Title bug-postUser">{curSummary}</p>
	                        </div>
	                        <div className="col-sm-2">
	                        	<p className="card-text bug-card-right">{bug.status}</p>
	                        	<p className="card text bug-card-right">{parsedDate(curDateCreated)}</p>
	                        	<Link to={"/Bugtracker/"+this.props.bugData._id} style={{textDecoration: 'none'}} >
	                        		<p className="edit-link">edit</p>
		                        </Link>
	                        	<DeleteBugBtn _uniqueID={this.props.bugData._id} />
	                        </div>
	                     </div>
	                     <div className="row">
	                    <button className="btn btn-secondary bug-collapse" type="button" data-toggle="collapse" data-target={coll_target} aria-expanded="false">
							Expand
						</button>
	                     </div>
                    </div>

                    <div className="collapse" id={coll_cn}>
						<div className="card card-block">
						 	<div className="card">
						 		<div className="row bug-expand">
									<div className="col-sm-6 bug-expand-left">
										<li>id: {curID}</li>
										<li>issue ID: {curIssue}</li>
										<li>Date created: {parsedDate(curDateCreated)}</li>
										<li>Description: {curDesc}</li>
										<li>Assigned user: {curAssignedUser}</li>
										<li>Reporter: {curReporter}</li>
										<li>Severity: {curSev}</li>
									</div>
									<div className="col-sm-6 bug-expand-right">
										{makeActionList(bug.actions)}
									</div>
								</div>
							</div>
						</div>
					</div>
                </div>
             
		);
	}
}