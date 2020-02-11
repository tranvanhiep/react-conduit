import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ArticleMeta from './ArticleMeta';
import FavoriteButton from './FavoriteButton';
import PropTypes from 'prop-types';

class ArticlePreview extends Component {
  render() {
    const { article, favoriting } = this.props;
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
    } = article;

    return (
      <div className="article-preview">
        <ArticleMeta createdAt={createdAt} author={author}>
          <div className="pull-xs-right">
            <FavoriteButton
              slug={slug}
              favorited={favorited}
              favoritting={favoriting}
            >
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

ArticlePreview.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    favorited: PropTypes.bool,
    favoritesCount: PropTypes.number,
    author: PropTypes.object,
    favoriting: PropTypes.bool,
  }),
};

export default ArticlePreview;
