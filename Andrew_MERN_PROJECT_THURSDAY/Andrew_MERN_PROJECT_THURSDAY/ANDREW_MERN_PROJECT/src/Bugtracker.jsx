import React from 'react';
import BugStore from './store/BugStore';
import Bug from './Bug';
import CreateNewBugForm from './CreateNewBugForm';
import Sortrow from './Sortrow';
import Searchbox from './Searchbox';

import * as BugAction from './actions/BugActions';

export default class Bugtracker extends React.Component{

	constructor(){
		super();
		this.state = {
			isCBBHidden: false,
			bugArrayDOM: [],
			searchText: "",
			filteredBugs: [],
			isHPSelected: false,
			sevState: "off",
			onBugState: false,
			onIssueState: false
		};
		this._onChange = this._onChange.bind(this);
		this._handleSearchChange = this._handleSearchChange.bind(this);
		this._onFilterChange = this._onFilterChange.bind(this);
		this.handleHPClick = this.handleHPClick.bind(this);
		this.handleSevClick = this.handleSevClick.bind(this);
		this.onBugClick = this.onBugClick.bind(this);
		this.onIssueClick = this.onIssueClick.bind(this);
		/*this._handleAZClick = this._handleAZClick.bind(this)*/;
	}	


	componentWillMount(){
		BugStore.on("bugFilter", this._onFilterChange);
		BugStore.on("bugDataChange", this._onChange);
	}

	componentWillUnmount(){
		BugStore.removeListener("bugFilter", this._onFilterChange);
		BugStore.removeListener("bugDataChange", this._onChange);
	}

	componentDidMount(){
		setTimeout(() => {
  			this.getBugonload();
		}, 1000);
	}

	_onFilterChange(){
		let filteredBugList = BugStore.getFilteredBugs();
		this.setState({filteredBugs: filteredBugList});
		this.renderDataToDOM(filteredBugList);
	}

	getBugonload(){
		let bugsFromAPI = BugStore.getBugData();
		this.renderDataToDOM(bugsFromAPI);
	}

	renderDataToDOM(bugList){
		let reqBugArray = [];
		bugList.forEach((bug) => {
			let uniqueId = bug._id;
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

	_onChange(){
		this.getBugonload();
		console.log("event captured. re-render bug list");
	}

	_handleSearchChange(input){
		console.log(input);
		this.setState({searchText: input});
		BugAction.filterSearchInput(input);

	}

	 _onCBBClick(){
        this.setState({isCBBHidden: !(this.state.isCBBHidden)});
    }

	handleHPClick(){
		this.setState({isHPSelected: !(this.state.isHPSelected)}, () => {
			/*BugActions.sortByHP(this.state.isHPSelected);*/
			console.log(this.state.isHPSelected);
			let bugList = [];
			if(this.state.filteredBugs.length > 0){
				bugList = this.state.filteredBugs;
			}
			else{
				bugList = BugStore.getBugData();
			}
			if(this.state.isHPSelected === true){
				console.log(bugList);
				let reqBugArray = [];
				for(let i = 0; i<bugList.length; i++){
					let curBug = bugList[i];
					let curHP = curBug.highPriority;
					if(curHP === "TRUE"){
						reqBugArray.push(curBug);
					}
				}
				console.log(reqBugArray);
				this.renderDataToDOM(reqBugArray);
			}
			if(this.state.isHPSelected === false){
				this.renderDataToDOM(bugList);
			}
		});
	}


	handleSevClick(){
		// off low medium high
		let sev = this.state.sevState;
		let bugList = [];
		if(this.state.filteredBugs.length > 0){
			bugList = this.state.filteredBugs;
		}
		else{
			bugList = BugStore.getBugData();
		}
		if(sev == "off"){
			this.setState({sevState: "low"}, () =>{
				
				let reqBugArray = [];
				for(let i = 0; i<bugList.length; i++){
					let curBug = bugList[i];
					let curSev = curBug.severity;
					if(curSev === "LOW"){
						reqBugArray.push(curBug);
					}
				}
				this.renderDataToDOM(reqBugArray);
			});	
		}	
			
		if(sev === "low"){
			this.setState({sevState: "medium"}, () =>{

				let reqBugArray = [];
				for(let i = 0; i<bugList.length; i++){
					let curBug = bugList[i];
					let curSev = curBug.severity;
					if(curSev === "MEDIUM"){
						reqBugArray.push(curBug);
					}
				}
				this.renderDataToDOM(reqBugArray);
			});
		}
		if(sev === "medium"){
			this.setState({sevState: "high"}, () => {

				let reqBugArray = [];
				for(let i = 0; i<bugList.length; i++){
					let curBug = bugList[i];
					let curSev = curBug.severity;
					if(curSev === "HIGH"){
						reqBugArray.push(curBug);
					}
				}
				this.renderDataToDOM(reqBugArray);
			});
		}
		if(sev === "high"){
			this.setState({sevState: "off"}, () => {
				this.renderDataToDOM(bugList);
			});
		}

	}

	onBugClick(){
		this.setState({onBugState: !(this.state.onBugState)}, () => {
			let bugList = [];
			if(this.state.filteredBugs.length > 0){
				bugList = this.state.filteredBugs;
			}
			else{
				bugList = BugStore.getBugData();
			}
			if(this.state.onBugState === true){
				let reqBugArray = [];
				for(let i = 0; i<bugList.length; i++){
					let curBug = bugList[i];
					let curIssueWord = curBug.issueId;
					if(curIssueWord.includes("BUG")){
						reqBugArray.push(curBug);
					}
				}
				this.renderDataToDOM(reqBugArray);
			}
			if(this.state.onBugState === false){
				console.o
				this.renderDataToDOM(bugList);
			}
		});

	}

	onIssueClick(){
		this.setState({onIssueState: !(this.state.onIssueState)}, () => {
			let bugList = [];
			if(this.state.filteredBugs.length > 0){
				bugList = this.state.filteredBugs;
			}
			else{
				bugList = BugStore.getBugData();
			}
			if(this.state.onIssueState === true){
				console.log(bugList);
				let reqBugArray = [];
				for(let i = 0; i<bugList.length; i++){
					let curBug = bugList[i];
					let curIssueWord = curBug.issueId;
					if(curIssueWord.includes("ISSUE")){
						reqBugArray.push(curBug);
					}
				}
				console.log(reqBugArray);
				this.renderDataToDOM(reqBugArray);
			}
			if(this.state.onIssueState === false){
				this.renderDataToDOM(bugList);
			}
		});

	}

	render(){
		const showCBB = this.state.isCBBHidden;
		const isHPSel = this.state.isHPSelected;
		const curSevState = this.state.sevState;

		
		const getSevButton = (sev) => {
			console.log(sev);
			if(sev === "off"){
				return(
					<span className="badge badge-pill badge-default" id="sev-badge-off" onClick={this.handleSevClick} ref="sev_header_ref">Severity</span>
				);
			}
			if(sev === "low"){
				return(
					<span className="badge badge-pill badge-success" id="sev-badge-low" onClick={this.handleSevClick}>Severity</span>
				);
			}
			if(sev === "medium"){
				return(
					<span className="badge badge-pill badge-warning" id="sev-badge-med" onClick={this.handleSevClick}>Severity</span>
				);
			}
			if(sev === "high"){
				return(
					<span className="badge badge-pill badge-danger" id="sev-badge-high" onClick={this.handleSevClick}>Severity</span>
				);
			}	
		}

		return(
			<div className="container-fluid bugtrack-main">

				<div className="row bugtrack-banner">
					<div className="row bugtrack-h1">
					 	<a onClick={this._onCBBClick.bind(this)}><p ref="track_bug_ref">[Track A Bug!]</p></a>
					</div>
				</div>

				<div className="row">
					<div className="col-md-3">
						</div>
							<div className="col-md-6 col-sm-12">
	                            {/*Drop down, create new post*/}
	                            {showCBB ? (
	                               <CreateNewBugForm />
	                            ) : (
	                                null
	                            )}
	                        </div>
						<div className="col-md-3">
					</div>
				</div>


				<div className="row">
					<div className="bugtrack-body col-sm-10 ">
						<div className="card bugtracker-body">
	                        <div className="card-header h-20">
	                        	<div className="col-sm-1 ch-hp">	                        		
	                        		{isHPSel ? (
	                               		<span className="badge badge-pill badge-danger" id="hp-badge" onClick={this.handleHPClick} ref="hp_header_ref">HP</span>
	                            	) : (
	                                	<span className="badge badge-pill badge-default" id="hp-badge" onClick={this.handleHPClick} ref="hp_header_ref">HP</span>
	                            	)}
	                        	</div>
	                        	<div className="col-sm-1 ch-sev">
	                        		{getSevButton(curSevState)}
	                        	</div>
	                        	<div className="col-sm-3 ch-summ">
	                        	Summary
	                        	</div>
	                        	<div className="col-sm-2 ch-iss">
	                        	Issue 
	                        	{ this.state.onBugState ? (
	                        		<a href="#top"><img src="./images/bug.png" alt="bugbtn" className="bug-img-lg" onClick={this.onBugClick}></img></a>
	                        		)
	                        	:
	                        	(
	                        		<a href="#top"><img src="./images/bug.png" alt="bugbtn" className="bug-img" onClick={this.onBugClick}></img></a>
	                        		)}
	                        	
	                        	/
	                        	{ this.state.onIssueState ? (
	                        		<a href="#top"><img src="./images/issue.png" alt="issuebtn" className="issue-img-lg" onClick={this.onIssueClick}></img></a>
	                        		)
	                        	:
	                        	(
	                        		<a href="#top"><img src="./images/issue.png" alt="issuebtn" className="issue-img" onClick={this.onIssueClick}></img></a>
	                        		)}
	                        	
	                        	</div>
	                        	<div className="col-sm-2">
	                        	</div>
	                        	<div className="col-sm-1">
	                        	</div>
	                        	<div className="col-sm-2 ch-info">
	                        	<Searchbox 
								searchText={this.state.searchText} 
								textChange={this._handleSearchChange}
								/>
	                        	</div>
	                        </div>
	                        <div className="buglist">
								{this.state.bugArrayDOM}
	                        </div>
	                        
	                    </div>
					</div>
					<div className="col-sm-2">
					</div>
				</div>

			</div>
	
		);
	}
}

