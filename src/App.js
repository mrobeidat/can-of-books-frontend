import React from 'react';
import Header from './Header';
// import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import Profile from './components/profile';
import BestBooks from './BestBooks';
import Login from './Login';
import { withAuth0 } from '@auth0/auth0-react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  render() {
    console.log('app', this.props);
    return(
      <>
        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
            <Switch>
              <Route exact path="/">
              {this.props.auth0.isAuthinticated?<BestBooks/>:<Login/>}
              <BestBooks/>
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Route exact path="/profile"> <Profile/>
              </Route>
            </Switch>
            <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
