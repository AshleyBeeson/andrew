import React from 'react';
import BugStore from './store/BugStore';
import Bug from './Bug';
import CreateNewBugForm from './CreateNewBugForm';

export default class Bugtracker extends React.Component{

	constructor(){
		super();
		this.state = {
			isCBBHidden: false,
			bugArrayDOM: []
		};
		this._onChange = this._onChange.bind(this);
	}	


	componentWillMount(){
		BugStore.on("bugDataChange", this._onChange);
	}

	componentWillUnmount(){
		BugStore.removeListener("bugDataChange", this._onChange);
	}

	componentDidMount(){
		setTimeout(() => {
  			this.getBugAPIAndRender();
		}, 1000);
	}

	_onChange(){
		this.getBugAPIAndRender();
		console.log("event captured. re-render bug list");
	}


	getBugAPIAndRender(){

		let bugsFromAPI = BugStore.getBugData();
		let reqBugArray = [];
		

		bugsFromAPI.forEach((bug) => {
			let uniqueId = bug._id;
/*			let curID = bug.id;
			let curIssue = bug.issueId;
			let curDateCreated = bug.dateCreated;
			let curActions = bug.actions;
			let curSummary = bug.summary;
			let curDesc = bug.description;
			let curAssignedUser = bug.assignedUser;
			let curReporter = bug.reporter;
			let curSev = bug.severity;
			let curHPriority = bug.highPriority;
			let curStatus = bug.status;*/

			let curActions = bug.actions;
			let parsedActions = [];

			if(curActions.length > 0){
				curActions.forEach((act) => {
					parsedActions.push(
						[act.action, act.dateCreated, act.user]
					);
				});
			};

			reqBugArray.push(
				<Bug key={uniqueId} bugData={bug} actionArray={parsedActions}/>
			);
		});

		this.setState({bugArrayDOM: reqBugArray}, () => {
			console.log("state change");
		});
	}

	 _onCBBClick(){
        this.setState({isCBBHidden: !(this.state.isCBBHidden)});
    }
	
	render(){
		const showCBB = this.state.isCBBHidden;

		return(
			<div className="container-fluid bugtrack-main">

				<div className="row bugtrack-banner">
					<div className="row bugtrack-h1">
					 	<a onClick={this._onCBBClick.bind(this)}><p>[Track A Bug!]</p></a>
					</div>
				</div>

				<div className="row">
					<div className="col-md-4">
						</div>
							<div className="col-md-4 col-sm-12">
	                            {/*Drop down, create new post*/}
	                            {showCBB ? (
	                               <CreateNewBugForm />
	                            ) : (
	                                null
	                            )}
	                        </div>
						<div className="col-md-4">
					</div>
				</div>

				<div className="row">
					<div className="bugtrack-body col-sm-10 ">
						<div className="card">
	                        <div className="card-header h-20">
	                        	<div className="row">
	                        		<div className="col-sm-1">
	                        			Bugs
	                        		</div>
	                        		<div className="col-sm-11">
	                        			
	                        		</div>
	                        	</div>
	                        </div>
	                        {this.state.bugArrayDOM}
	                    </div>
					</div>
					<div className="col-sm-2">
					</div>
				</div>

			</div>
	
		);
	}
}