import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

export default ArticleMeta;
