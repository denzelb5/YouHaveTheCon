import React from 'react';
import './Navbar.scss';

class Navbar extends React.Component {
    render() {
        return (
            <ul className="nav justify-content-end">
            <li className="nav-item">
              <a className="nav-link active" href="#">My Cons</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">My Cosplays</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Cosplay Planner</a>
            </li>
            
          </ul>
        )
    }
}

export default Navbar;