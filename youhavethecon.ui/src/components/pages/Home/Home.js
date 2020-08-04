import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../../helpers/data/authData';
import { Link } from 'react-router-dom';
import './Home.scss';



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
                <div className="buffer-top"></div>
                <div className="con-box">
                    <h1 className="you-have-the-con">YOU HAVE THE CON</h1>
                    { !authed && (
                        <Link
                        className='btn btn-danger login-btn'
                        to='/login'
                        onClick={this.loginClickEvent}
                        >Login
                        </Link>
                    )}

                </div>
                
            </div>
        )
    }
}

export default Home;