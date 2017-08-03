import dispatcher from '../store/dispatcher';

export function createNewBug(bugPayload) {
    dispatcher.dispatch({
        type: "CREATE_NEW_BUG",
        bugPayload,
    });
}

export function getBugDetails(uid){
	dispatcher.dispatch({
		type: "GET_BUG_FROM_UID",
		uid,
	})
}

export function editBugDetails(uid, bugPayload){
	dispatcher.dispatch({
		type: "EDIT_BUG_DETAILS",
		uid, 
		bugPayload,
	})
}

export function filterSearchInput(searchText){
	dispatcher.dispatch({
		type: "FILTER_SEARCH_INPUT",
		searchText,
	})
}

export function deleteBugById(uid){
	dispatcher.dispatch({
		type:"DELETE_BUG",
		uid,
	})
}

export function setAZList(isAZReq){
	dispatcher.dispatch({
		type: "SET_AZ_LIST",
		isAZReq,
	})
}