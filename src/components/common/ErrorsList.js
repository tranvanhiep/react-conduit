import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

ErrorsList.propTypes = {
  errors: PropTypes.shape({
    body: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default ErrorsList;
