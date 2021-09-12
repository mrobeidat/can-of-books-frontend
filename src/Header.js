import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import './Header.css';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/loginButton';
import LogoutButton from './components/logoutButton';


class Header extends React.Component {
  render() {
    console.log(this.props)
    
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {this.props.isAuthinticated?<LogoutButton/>:<LoginButton/>}

        <LogoutButton/>
        {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
      </Navbar>
    );
  }
}

export default withAuth0(Header);
