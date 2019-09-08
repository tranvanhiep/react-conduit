import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

class Comment extends Component {
  render() {
    const { comment, slug } = this.props;
    const {
      id,
      createdAt,
      body,
      author: { username, image },
    } = comment;
    const encodedUsername = encodeURIComponent(username);

    return (
      <div className="card">
        <div className="card-block">
          <p className="card-text">{body}</p>
        </div>
        <div className="card-footer">
          <Link to={`/profile/${encodedUsername}`} className="comment-author">
            <img src={image} alt={username} className="comment-author-img" />
          </Link>
          &nbsp;
          <Link to={`/profile/${encodedUsername}`} className="comment-author">
            {username}
          </Link>
          <span className="date-posted">{new Date(createdAt).toDateString()}</span>
          <DeleteButton id={id} username={username} slug={slug} />
        </div>
      </div>
    );
  }
}

export default Comment;
