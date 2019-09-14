import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const LoggedOutView = ({ currentUser }) => {
  if (currentUser) {
    return null;
  }

  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" exact activeClassName="active">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login" activeClassName="active">
          Sign in
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/register" activeClassName="active">
          Sign up
        </NavLink>
      </li>
    </ul>
  );
};

const LoggedInView = ({ currentUser }) => {
  if (!currentUser) {
    return null;
  }

  const { username, image } = currentUser;

  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <NavLink className="nav-link" to="/" exact activeClassName="active">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/editor" activeClassName="active">
          <i className="ion-compose"></i>&nbsp;New Post
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/settings" activeClassName="active">
          <i className="ion-gear-a"></i>&nbsp;Settings
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={`/${username}`} activeClassName="active">
          <img src={image} alt={username} className="user-pic" />
          {username}
        </NavLink>
      </li>
    </ul>
  );
};

class Header extends Component {
  render() {
    const { currentUser, appName } = this.props;
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            {appName.toLowerCase()}
          </NavLink>

          <LoggedOutView currentUser={currentUser} />
          <LoggedInView currentUser={currentUser} />
        </div>
      </nav>
    );
  }
}

export default Header;
