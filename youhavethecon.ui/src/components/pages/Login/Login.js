import React from 'react';
import { Link } from 'react-router-dom';
import userData from '../../../helpers/data/userData';

class Login extends React.Component {
  state = {
    email: 'denviol@yahoo.com',
    user: []
  }

  getUserData = () => {
    const { email } = this.state;
    userData.getUser(email)
      .then((user) => this.setState({ user }))
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
        <Link to="/convention/allcons" className="btn btn-primary">My Cons</Link>
        
      </div>
    );
  }
}

export default Login;