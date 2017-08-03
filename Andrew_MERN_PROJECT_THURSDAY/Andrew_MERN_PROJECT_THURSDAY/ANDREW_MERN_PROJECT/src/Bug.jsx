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
                   
                    actionDOMList.push(
                        <div key={divKey} className="card card-outline-primary mb-3 text-cente">
                        <div className="card-block">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">{curActionArray.user}</li>
                                <li className="list-group-item">{curActionArray.dateCreated}</li>
                                <li className="list-group-item">{curActionArray.action}</li>
                            </ul>
                        </div>
                        </div>
                    );
                };
            }
            return actionDOMList;
        }

        const getSev = (sev) => {
        	if(sev == "LOW"){
        		return(
        			<img src="./images/lowSev.png" alt="lowSev" className="lowSev-Img"></img>
        		);
        	}
        	if(sev == "MEDIUM"){
        		return(
        		    <img src="./images/medSev.png" alt="lowSev" className="lowSev-Img"></img>
        		);
        	}
        	if(sev == "HIGH"){
        		return(
        		<img src="./images/highSev.png" alt="lowSev" className="lowSev-Img"></img>
        		);
        	}
        }

        const showAlert = this.state.showHPImg;
        /*console.log(parsedDate());*/
        let coll_cn = "bug-collapsible-"+this.props.bugData._id;
        let coll_target = "#"+coll_cn;

        return(
            <div className="card bug-card">
                <div className="card-block">
                    <div className="row">
                        <div className="col-sm-1 bug-hPriority">
                            {showAlert ? (
                                <img src="./images/highPriority.png" alt="hp" className="hp-Img"></img>
                            ) : (
                                null
                            )}
                        </div>
                        <div className="col-sm-1 bug-severity">
                        	{getSev(curSev)}
                        </div>
                        <div className="col-sm-3 bug-summary">
                            <p className="card-title bug-postUser" ref="bug_summ_ref">{curSummary}</p>
                        </div>
                        <div className="col-sm-2 bug-issueid">
                        	<p className="card-text">{curIssue}</p>
                        </div>
                        <div className="col-sm-2 ">
                        </div>
                        <div className="col-sm-1">
                        </div>
                        <div className="col-sm-2 bug-info">
                            <p className="card-text bug-card-right">{curStatus}</p>
                            <p className="card text bug-card-right">{parsedDate(curDateCreated)}</p>
                            <Link to={"/Bugtracker/"+this.props.bugData._id} style={{textDecoration: 'none'}} >
                                <p className="edit-link">edit</p>
                            </Link>
                            <DeleteBugBtn _uniqueID={this.props.bugData._id} />
                        </div>
                    </div>

                    <div className="row">
                        <button className="btn btn-secondary bug-collapse btn-sm" type="button" data-toggle="collapse" data-target={coll_target} aria-expanded="false">
                            Expand
                        </button>
                    </div>
                </div>

                <div className="collapse bug-card" id={coll_cn}>
                    <div className="row">
                        <div className="col-sm-18">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">id: {curID}</li>
                                <li className="list-group-item">issue ID: {curIssue}</li>
                                <li className="list-group-item">Date created: {parsedDate(curDateCreated)}</li>
                               	<li className="list-group-item">Summary: {curSummary}</li>
                                <li className="list-group-item">Description: {curDesc}</li>
                                <li className="list-group-item">Assigned user: {curAssignedUser}</li>
                                <li className="list-group-item">Reporter: {curReporter}</li>
                                <li className="list-group-item">Severity: {curSev}</li>
                                <li className="list-group-item">Status: {curStatus}</li>
                            </ul>
                        </div>
                        <div className="col-sm-4">
                            {makeActionList(curActions)} 
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
