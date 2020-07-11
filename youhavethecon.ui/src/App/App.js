import React from 'react';
import AllCons from '../components/pages/AllCons/AllCons';
import Navbar from '../components/shared/Navbar/Navbar';
import Home from '../components/pages/Home/Home';
import Login from '../components/pages/Login/Login';
import SingleCon from '../components/pages/SingleCon/SingleCon';
import AllCosplays from '../components/pages/AllCosplays/AllCosplays';


import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import './App.scss';


const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};



class App extends React.Component {
  state = { authed: false }

  componentDidMount() {
    if (sessionStorage.getItem('userId')) {
      this.setState({ authed: true });
    } else {
      this.setState({ authed: false });
    }
  }

  componentWillUnmount() {
    if (sessionStorage.getItem('userId')) {
      this.setState({ authed: true });
    } else {
      this.setState({ authed: false });
    }
  }

  handleAuthChange(authed) {
    this.setState({authed: authed});
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">

        <Router>
          <Navbar authed={authed} />
          <Switch>
            <Route path="/" exact component={Home} authed={authed} />
            <PrivateRoute path="/login" exact component={Login} authed={authed} handleAuth={this.handleAuthChange} />
            <PrivateRoute path="/con/allcons" exact component={AllCons} authed={authed} />
            <PrivateRoute path="/con/:conId" exact component={SingleCon} authed={authed} />
            <PrivateRoute path="/cosplay/allcosplays" exact component={AllCosplays} authed={authed} />
          </Switch>
        </Router>
        
      </div>
    );

  }
}

export default App;
