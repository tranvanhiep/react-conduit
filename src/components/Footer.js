import React from 'react';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div class="container">
          <Link to="/" className="logo-font">
            {this.props.appName}
          </Link>
          <span class="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code
            &amp; design licensed under MIT.
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
