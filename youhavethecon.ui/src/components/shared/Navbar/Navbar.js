import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

class Navbar extends React.Component {
    state = {
        authed: false
    }

    render() {
        // const { authed } = this.state;

        return (
            <div>
            <nav className="navbar navbar-expand">
              <div className="navbar-nav ml-auto">
                <ul className="navbar-nav justify-content-end">
                  <li className="nav-item">
                    { 
                      <Link
                        className="nav-link"
                        to="/con/allcons">
                        My Cons
                      </Link>
                    }
                  </li>
                  <li className="nav-item cosplay">
                    { 
                      <Link
                        className="nav-link"
                        to="/cosplay/allcosplays">
                        My Cosplays
                      </Link>
                    }
                  </li>
                  <li className="nav-item logout">
                    <Link
                      className='nav-link logoutBtn'
                      to='/'
                    //   onClick={this.logMeOut}
                      >Log Out
                    </Link>  
                </li>  
                </ul>
              </div>
            </nav>
          </div>
        )
    }
}

export default Navbar;