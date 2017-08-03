import React from 'react';

export default class Home extends React.Component{

    render(){
        return(
            <div>
                <div className="container">
                   
                    <p ref="home1_ref">Hello Home Page here</p>
                    <div className="card">
						  <div className="card-block">
						    This is some text within a card block.
						  </div>
                	</div>
                </div>
            </div>
        );
    }

}
