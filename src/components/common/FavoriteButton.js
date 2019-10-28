import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { favorite, unfavorite } from '../../actions/article';
import { redirectToUrl } from '../../actions/common';
import { favoriteArticle, unfavoriteArticle } from '../../actions/articleList';

class FavoriteButton extends Component {
  toggleFavorite = (favorited, slug) => event => {
    event.preventDefault();
    const {
      currentUser,
      match: { params },
    } = this.props;

    event.currentTarget.blur();

    if (currentUser) {
      if (params && params.slug) {
        if (favorited) {
          this.props.unfavorite(slug);
        } else {
          this.props.favorite(slug);
        }
      } else {
        if (favorited) {
          this.props.unfavoriteArticle(slug);
        } else {
          this.props.favoriteArticle(slug);
        }
      }
    } else {
      this.props.redirectToUrl('/login');
    }
  };

  render() {
    const { favorited, slug, children, favoriteRequesting } = this.props;

    return (
      <button
        className={cx(
          'btn btn-sm',
          { 'btn-primary': favorited },
          { 'btn-outline-primary': !favorited }
        )}
        onClick={this.toggleFavorite(favorited, slug)}
        disabled={favoriteRequesting}
      >
        {children}
      </button>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
});

export default connect(
  mapStateToProps,
  { favorite, unfavorite, favoriteArticle, unfavoriteArticle, redirectToUrl }
)(FavoriteButton);
