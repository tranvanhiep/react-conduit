import React, { Component } from 'react';

class ErrorsList extends Component {
  render() {
    const { errors } = this.props;

    if (!errors) {
      return null;
    }

    return (
      <ul className="error-messages">
        {Object.keys(errors).map(key => (
          <li key={key}>
            {key} {errors[key]}
          </li>
        ))}
      </ul>
    );
  }
}

export default ErrorsList;
