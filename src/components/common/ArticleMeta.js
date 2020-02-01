import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ArticleMeta extends Component {
  render() {
    const {
      createdAt,
      author: { username, image },
      children,
    } = this.props;
    const encodedUsername = encodeURIComponent(username);

    return (
      <div className="article-meta">
        <Link to={`/profile/${encodedUsername}`}>
          <img src={image} alt={username} />
        </Link>
        <div className="info">
          <Link to={`/profile/${encodedUsername}`} className="author">
            {username}
          </Link>
          <span className="date">{new Date(createdAt).toDateString()}</span>
        </div>
        {children}
      </div>
    );
  }
}

ArticleMeta.propTypes = {
  createdAt: PropTypes.string,
  author: PropTypes.shape({
    image: PropTypes.string,
    username: PropTypes.string,
  }),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

export default ArticleMeta;
