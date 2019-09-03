import React, { Component } from 'react';

class Banner extends Component {
  render() {
    const { appName, token } = this.props;

    if (token) {
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

export default Banner;
