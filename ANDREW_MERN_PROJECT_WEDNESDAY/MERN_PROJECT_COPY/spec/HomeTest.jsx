import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import Home from '../src/Home';

describe('Home Page:', function(){
    
    let homePage = TestUtils.renderIntoDocument(
        <Home />
    );

    it("\nRenders hello messsage in p tag", function(){
        let homeMessage = homePage.refs.home1_ref;
        expect(ReactDOM.findDOMNode(homeMessage).textContent).toEqual("Hello Home Page here");
    });
});
