import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../../helpers/data/authData';
import { Link } from 'react-router-dom';



class Home extends React.Component {
    static propTypes = {
        authed: PropTypes.bool
    }

    loginClickEvent = () => {
        authData.loginUser('denviol@yahoo.com');
        
    }

    render() {
        const { authed } = this.props;
        return (
            <div className="home">
                <h1>Home page</h1>
                
                { !authed && (
                    <Link
                      className='btn btn-dark login-btn'
                      to='/login'
                      onClick={this.loginClickEvent}
                      >Login
                    </Link>
                    )}
            </div>
        )
    }
}

export default Home;