import React from 'react';
import {Link} from 'react-router';

export default class Navbar extends React.Component{

	render(){
		return(
			 <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
                <div className="container">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="navbar-item active"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/Bugtracker">Bug Tracking Tool</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

			);
	}
}