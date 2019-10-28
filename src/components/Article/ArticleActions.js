import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteArticle } from '../../actions/article';
import FavoriteButton from '../common/FavoriteButton';
import FollowButton from '../common/FollowButton';

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
          <Link to={`/editor/${slug}`} className="btn btn-outline-secondary btn-sm">
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
        <FavoriteButton favorited={favorited} slug={slug} favoriteRequesting={favoriteRequesting}>
          {favorited ? 'Unfavorite' : 'Favorite'} Article ({favoritesCount})
        </FavoriteButton>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state.article,
  currentUser: state.common.currentUser,
});

export default connect(
  mapStateToProps,
  { deleteArticle }
)(ArticleActions);
