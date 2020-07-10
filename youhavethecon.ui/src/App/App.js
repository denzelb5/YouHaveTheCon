import React from 'react';
import AllCons from '../components/pages/AllCons/AllCons';
import Navbar from '../components/shared/Navbar/Navbar';
import Home from '../components/pages/Home/Home';
import Login from '../components/pages/Login/Login';
import SingleCon from '../components/pages/SingleCon/SingleCon';
import AllCosplays from '../components/pages/AllCosplays/AllCosplays';
// import FirebaseApp from '../helpers/data/connection';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import './App.scss';
import { auth } from 'firebase';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

// FirebaseApp();

class App extends React.Component {
  state = { authed: false }

  // componentDidMount() {
  //   this.removeListener = firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({ authed: true });
  //     } else {
  //       this.setState({ authed: false });
  //     }
  //   });
  // };


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
            <PublicRoute path="/" exact component={Home} authed={authed} />
            <PublicRoute path="/login" exact component={Login} authed={authed} handleAuth={this.handleAuthChange} />
            <PublicRoute path="/con/allcons" exact component={AllCons} authed={authed} />
            <PublicRoute path="/con/:conId" exact component={SingleCon} authed={authed} />
            <PublicRoute path="/cosplay/allcosplays" exact component={AllCosplays} authed={authed} />
          </Switch>
        </Router>
        
      </div>
    );

  }
}

export default App;
