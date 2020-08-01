import React from 'react';
import AllCons from '../components/pages/AllCons/AllCons';
import Navbar from '../components/shared/Navbar/Navbar';
import Home from '../components/pages/Home/Home';
import Login from '../components/pages/Login/Login';
import SingleCon from '../components/pages/SingleCon/SingleCon';
import AllCosplays from '../components/pages/AllCosplays/AllCosplays';
import AddConForm from '../components/pages/AddConForm/AddConForm';
import AllConEvents from '../components/pages/AllConEvents/AllConEvents';
import AddEventForm from '../components/pages/AddEventForm/AddEventForm';
import AddCosplayForm from '../components/pages/AddCosplayForm/AddCosplayForm';



import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import './App.scss';
import authData from '../helpers/data/authData';
import SingleCosplay from '../components/pages/SingleCosplay/SingleCosplay';
import AddCosplayPieceForm from '../components/shared/AddCosplayPieceForm/AddCosplayPieceForm';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const authed = authData.authed();
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  render() {
    return (
      <div className="App">

        <Router>
          <Navbar/>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/convention/allcons/:userId" exact component={AllCons} />
            <PrivateRoute path="/con/:conId/:userId" exact component={SingleCon} />
            <PrivateRoute path ="/addcon" exact component={AddConForm} />
            <PrivateRoute path="/cosplay/allcosplays/:userId" exact component={AllCosplays} />
            <PrivateRoute path="/cosplay/:cosplayId" exact component={SingleCosplay} />
            <PrivateRoute path="/event/allevents/:conId/:userId" exact component={AllConEvents} />
            <PrivateRoute path="/addevent/:conId/:userId" exact component={AddEventForm} />
            <PrivateRoute path="/editevent/:eventId/:conId/:userId" exact component={AddEventForm} />
            <PrivateRoute path="/addcosplay/:userId" exact component={AddCosplayForm} />
          </Switch>
        </Router>
      </div>
    );

  }
}

export default App;
