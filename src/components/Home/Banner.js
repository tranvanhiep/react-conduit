import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Banner extends Component {
  render() {
    const { appName, currentUser } = this.props;

    if (currentUser) {
      return null;
    }

    return (
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">{appName.toLowerCase()}</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
    );
  }
}

Banner.propTypes = {
  appName: PropTypes.string.isRequired,
  currentUser: PropTypes.object,
};

export default Banner;
