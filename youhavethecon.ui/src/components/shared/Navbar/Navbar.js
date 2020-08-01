import React from 'react';
import { Link } from 'react-router-dom';
import authData from '../../../helpers/data/authData';
import './Navbar.scss';

class Navbar extends React.Component {

    logMeOut = () => {
      authData.logoutUser();
    }

    render() {
        const userId = authData.getUserId();
        const authed = authData.authed();

        return (
            <div>
            <nav className="navbar navbar-expand">
              <div className="navbar-nav ml-auto">
                <ul className="navbar-nav justify-content-end">
                  <li className="nav-item">
                  { authed && ( 
                      <Link
                        className="nav-link"
                        to={`/convention/allcons/${userId}`}>
                        My Cons
                      </Link>
                  )}
                  </li>
                  <li className="nav-item cosplay">
                  { authed && (
                      <Link
                        className="nav-link"
                        to={`/cosplay/allcosplays/${userId}`}>
                        My Cosplays
                      </Link>
                  )}
                  </li>
                  <li className="nav-item logout">
                   { authed && (
                    <Link
                      className='nav-link logoutBtn'
                      to='/'
                       onClick={this.logMeOut}
                      >Log Out
                    </Link> 
                  )}  
                    
                </li>  
                </ul>
              </div>
            </nav>
          </div>
        )
    }
}

export default Navbar;