import { EventEmitter } from 'events';
import dispatcher from './dispatcher';

class BugStore extends EventEmitter{

	constructor(){
		super();
		this.bugData = [];
		this.singleBugData = "";
		this.loadBugsFromAPI();
		this.filteredBugData = [];
	}

	loadBugsFromAPI(){
		this.bugData = [];
		fetch("/api/bugs").then(function(data){
			return data.json();
		}).then( json => {
			json.forEach((bug) =>{
				this.bugData.push(bug);
			});
		}).then( () => {
			console.log("loaded from api complete");
		});

	}

	getBugData(){
		return this.bugData;
	}

	getSingleBugData(){
		return this.singleBugData;
	}

	getFilteredBugs(){
		return this.filteredBugData;
	}

	handleActions(action){
		switch(action.type){
			case "CREATE_NEW_BUG":
				this.createNewBug(action.bugPayload);
			break;
			case "GET_BUG_FROM_UID":
				this.getBugFromUID(action.uid);
			break;
			case "EDIT_BUG_DETAILS":
				this.editBugDetails(action.uid, action.bugPayload);
			break;
			case "FILTER_SEARCH_INPUT":
				this.filterSearchInput(action.searchText);
			break;
			case "SET_AZ_LIST":
				this.setAZList(action.isAZReq);
			break;
			case "DELETE_BUG":
				this.deleteBugById(action.uid);
			break;
			default:
			break;
		}
	}

	deleteBugById(uid){
		let URL = "/api/bugs/"+uid;

		fetch(URL, {
			method: "DELETE",
		}).then( res => res.json())
		.then( (res) => {
			this.loadBugsFromAPI();
			console.log("delete success: ", res);
		});

		setTimeout( () => {
			this.emit("bugDataChange");
		}, 800);
	}

	setAZList(isAZReq){
		let FBD = this.filteredBugData;
		if(isAZReq === true){

		}
		if(isAZReq === false){

		}
	}

	filterSearchInput(searchText){
		this.filteredBugData = [];
		this.bugData.forEach( (bug) => {
			if(bug.summary.toUpperCase().indexOf(searchText.toUpperCase()) !== -1) {
				this.filteredBugData.push(bug);
			}
		});
		this.emit("bugFilter");
	}

	editBugDetails(uid, bugPayload){
		let URL = "/api/bugs/"+uid;

		fetch(URL, {
			method: "PUT",
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'				
			},
			body: JSON.stringify({
				id: bugPayload[0],
				issueId: bugPayload[1],
				dateCreated: bugPayload[2],
				summary: bugPayload[3],
				description: bugPayload[4],
				highPriority: bugPayload[5],
				severity: bugPayload[6],
				reporter: bugPayload[7],
				assignedUser: bugPayload[8],
				status: bugPayload[9]	
			})
		}).then( (res) => {
			console.log("Req success: ", res);
			this.getBugFromUID(uid);
		});

		setTimeout( () => {
			this.emit("bugDataChange");
		}, 200);
			
	}

	getBugFromUID(uid){
		let URL = "/api/bugs/"+uid;	
		fetch(URL).then(function(data){
			return data.json();
		}).then( json =>{
			json.forEach((item) =>{
				this.singleBugData = (item);
			});
		});

		setTimeout( () => {
			this.emit("singleBugEv");
		}, 400);
		
	}

	createNewBug(bugPayload){
		let URL = "/api/bugs/";
		fetch(URL, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: bugPayload[0],
				issueId: bugPayload[1],
				dateCreated: bugPayload[2],
				summary: bugPayload[3],
				description: bugPayload[4],
				highPriority: bugPayload[5],
				severity: bugPayload[6],
				reporter: bugPayload[7],
				assignedUser: bugPayload[8],
				status: bugPayload[9]				
			})
			}).then( (res) => {
				this.loadBugsFromAPI();
				console.log("req success: ", res);
			});
			
			setTimeout( () => {
				this.emit("bugDataChange");
			}, 800);
	}


}

const bugStore = new BugStore();
dispatcher.register(bugStore.handleActions.bind(bugStore));
export default bugStore;
