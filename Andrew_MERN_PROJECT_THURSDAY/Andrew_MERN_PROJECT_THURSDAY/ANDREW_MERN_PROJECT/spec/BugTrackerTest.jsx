import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import BugTracker from '../src/BugTracker';
import BugStore from '../src/store/BugStore';
import Bug from '../src/Bug';
import CreateNewBugForm from '../src/CreateNewBugForm';

describe('BugTracker page', function(){
	
	beforeEach(function(){
		let originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    	jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
	});
	
	beforeAll(function(done){
		setTimeout(done, 3000);
	});

	let bugTrackPage = TestUtils.renderIntoDocument(
		<BugTracker />
	);

	it("\nRenders TRACK A BUG button", function(){
		let message = bugTrackPage.refs.track_bug_ref;
		expect(ReactDOM.findDOMNode(message).textContent).toEqual("[Track A Bug!]");
	});

	it("\nRenders HP, Severity header correctly", function(){
		let hpBut = bugTrackPage.refs.hp_header_ref;
		let sevBut = bugTrackPage.refs.sev_header_ref;

		expect(ReactDOM.findDOMNode(hpBut).textContent).toEqual("HP");
		expect(ReactDOM.findDOMNode(sevBut).textContent).toEqual("Severity");  
	});

/*	it("\nRenders createNewBugForm", function(){

		let message = bugTrackPage.refs.track_bug_ref;
		TestUtils.Simulate.click(message);

		let comp = TestUtils.renderIntoDocument(
			<CreateNewBugForm />
			);

		let idref = comp.refs.cnbf_id_ref;
		expect(ReactDOM.findDOMNode(idref).textContent).toEqual("id:");

	});

	it("\nRenders a search box", function(){

		let bugList = BugStore.getBugData();

		let bug = TestUtils.renderIntoDocument(
				<Bug 
				bugData={bugList[0]} actionArray={bugList[0]} 
				/>,
		);

		let reqSummary = bugList[0].summary;
		let bugComment = bug.refs.bug_summ_ref;

		expect(ReactDOM.findDOMNode(bugComment).textContent).toEqual(reqSummary);
	});*/

});