import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteArticle } from '../../actions/article';
import FavoriteButton from '../common/FavoriteButton';
import FollowButton from '../common/FollowButton';
import PropTypes from 'prop-types';

class ArticleActions extends Component {
  delete = slug => event => {
    event.preventDefault();

    this.props.deleteArticle(slug);
  };

  render() {
    const {
      currentUser,
      article,
      followRequesting,
      favoriteRequesting,
      articleDeleting,
      params,
    } = this.props;
    const {
      author: { username, following },
      favorited,
      favoritesCount,
      slug,
    } = article;

    if (currentUser && currentUser.username === username) {
      return (
        <Fragment>
          <Link
            to={`/editor/${slug}`}
            className="btn btn-outline-secondary btn-sm"
          >
            <i className="ion-edit"></i> Edit Article
          </Link>
          &nbsp;
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={this.delete(slug)}
            disabled={articleDeleting}
          >
            <i className="ion-trash-a"></i> Delete Article
          </button>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <FollowButton
          username={username}
          following={following}
          followRequesting={followRequesting}
        ></FollowButton>
        &nbsp;
        <FavoriteButton
          favorited={favorited}
          slug={slug}
          favoriteRequesting={favoriteRequesting}
          params={params}
        >
          {favorited ? 'Unfavorite' : 'Favorite'} Article ({favoritesCount})
        </FavoriteButton>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.app.currentUser,
});

ArticleActions.propTypes = {
  article: PropTypes.object,
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    token: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
  }),
  followRequesting: PropTypes.bool,
  favoriteRequesting: PropTypes.bool,
  articleDeleting: PropTypes.bool,
};

export default connect(mapStateToProps, { deleteArticle })(ArticleActions);
