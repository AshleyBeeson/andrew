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
