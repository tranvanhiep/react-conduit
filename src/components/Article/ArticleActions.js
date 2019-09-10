import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteArticle } from '../../actions/article';
import FavoriteButton from '../common/FavoriteButton';
import FollowButton from '../common/FollowButton';
import { ARTICLE_PAGE } from '../../constants';

class ArticleActions extends Component {
  render() {
    const { currentUser, article, deleteArticle } = this.props;
    const {
      author: { username, following },
      favorited,
      favoritesCount,
      slug,
    } = article;

    if (username !== currentUser.username) {
      return (
        <Fragment>
          <FollowButton username={username} following={following}></FollowButton>
          &nbsp;
          <FavoriteButton favorited={favorited} slug={slug} from={ARTICLE_PAGE}>
            {favorited ? 'Unfavorite' : 'Favorite'} Article ({favoritesCount})
          </FavoriteButton>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Link to={`/editor/${slug}`} className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Article
        </Link>
        &nbsp;
        <button className="btn btn-outline-danger btn-sm" onClick={deleteArticle()}>
          <i className="ion-trash-a"></i> Delete Article
        </button>
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
