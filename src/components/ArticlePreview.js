import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { favorite, unfavorite } from '../actions/article';

class ArticlePreview extends Component {
  toggleFavorite = (favorited, slug) => event => {
    event.preventDefault();
    if (favorited) {
      this.props.unfavorite(slug);
    } else {
      this.props.favorite(slug);
    }
  };

  render() {
    const {
      slug,
      title,
      description,
      body,
      tagList,
      createdAt,
      favorited,
      favoritesCount,
      author: { username, bio, image, following },
    } = this.props.article;

    return (
      <div className="article-preview">
        <div className="article-meta">
          <Link to={`/profile/${username}`}>
            <img src={image} alt={username} />
          </Link>
          <div className="info">
            <Link to={`/profile/${username}`} className="author">
              {username}
            </Link>
            <span className="date">{new Date(createdAt).toDateString()}</span>
          </div>
          <button
            className={`btn btn-sm pull-xs-right ${
              favorited ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={this.toggleFavorite(favorited, slug)}
          >
            <i className="ion-heart"></i> {favoritesCount}
          </button>
        </div>
        <Link to={`/article/${slug}`} className="preview-link">
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{body}</p>
          <span>Read more...</span>
          <ul className="tag-list">
            {tagList.map(tag => (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </Link>
      </div>
    );
  }
}

export default connect(
  null,
  { favorite, unfavorite }
)(ArticlePreview);
