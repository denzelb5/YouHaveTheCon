import React from 'react';
import { Link } from 'react-router-dom';
import userData from '../../../helpers/data/userData';
import authData from '../../../helpers/data/authData';

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
      <div className="Profile">
        <h1>Welcome {user.firstName} {user.lastName}</h1>
        <h3>User Email: {user.email}</h3>
        <Link to={`/convention/allcons/${user.userId}`} className="btn btn-primary">My Cons</Link>
        
      </div>
    );
  }
}

export default Login;