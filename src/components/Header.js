import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = ({ currentUser }) => {
  if (currentUser) {
    return null;
  }

  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Sign in
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign up
        </Link>
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
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/editor">
          <i className="ion-compose"></i>&nbsp;New Post
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/settings">
          <i className="ion-gear-a"></i>&nbsp;Settings
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={`/${username}`}>
          <img src={image} alt={username} className="user-pic" />
          {username}
        </Link>
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
          <Link className="navbar-brand" to="/">
            {appName.toLowerCase()}
          </Link>

          <LoggedOutView currentUser={currentUser} />
          <LoggedInView currentUser={currentUser} />
        </div>
      </nav>
    );
  }
}

export default Header;
