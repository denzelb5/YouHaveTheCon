import React from 'react';
import { Link } from 'react-router-dom';
import authData from '../../../helpers/data/authData';
import './Login.scss';

class Login extends React.Component {
  state = {
    email: 'denviol@yahoo.com',
    user: []
  }

  getUserData = () => {
    const { email } = this.state;
    authData.loginUser(email)
      .then((user) => {
        this.setState({ user });
        this.props.onLogin();
      })
      .catch((error) => console.error(error));
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    const { user } = this.state;

    return (
      <div className="login">
        <div className="login-top-buffer"></div>
        <div className="welcome">
          <h1>Welcome {user.firstName} {user.lastName}</h1>
          <h4>Your Journey Awaits You...</h4>
          <Link to={`/convention/allcons/${user.userId}`} className="btn btn-primary">My Cons</Link>
          <div className="login-buffer"></div>
        </div>
        
      </div>
    );
  }
}

export default Login;