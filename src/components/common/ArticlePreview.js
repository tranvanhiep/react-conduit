import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ArticleMeta from './ArticleMeta';
import FavoriteButton from './FavoriteButton';

class ArticlePreview extends Component {
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
      author,
    } = this.props.article;

    return (
      <div className="article-preview">
        <ArticleMeta createdAt={createdAt} author={author}>
          <div className="pull-xs-right">
            <FavoriteButton slug={slug} favorited={favorited}>
              <i className="ion-heart"></i> {favoritesCount}
            </FavoriteButton>
          </div>
        </ArticleMeta>
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

export default ArticlePreview;
