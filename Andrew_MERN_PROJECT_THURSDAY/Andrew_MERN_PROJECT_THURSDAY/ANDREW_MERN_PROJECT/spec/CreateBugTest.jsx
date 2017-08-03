import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import CreateNewBugForm from '../src/CreateNewBugForm';

describe('createbug page', function(){

	beforeAll(function(done){
		setTimeout(done, 1000);
	});

	it("\nRenders createNewBugForm", function(){
		let comp = TestUtils.renderIntoDocument(
			<CreateNewBugForm />
		);

		let idref = comp.refs.cnbf_id_ref;
		expect(ReactDOM.findDOMNode(idref).textContent).toEqual("id:");
	});


	});