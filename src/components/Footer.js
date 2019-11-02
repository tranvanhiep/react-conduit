import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    const { appName } = this.props;

    return (
      <footer>
        <div className="container">
          <Link to="/" className="logo-font">
            {appName.toLowerCase()}
          </Link>
          <span className="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code
            &amp; design licensed under MIT.
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
