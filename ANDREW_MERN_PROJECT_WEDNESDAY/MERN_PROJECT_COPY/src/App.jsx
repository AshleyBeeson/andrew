import React from 'react';
import Navbar from './NavBar';

export default class App extends React.Component{

    render(){
        return(
            <div id="domMain">
            	 <Navbar />
                {this.props.children} 
            </div>
        );
    }
}
