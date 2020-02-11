import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { favorite, unfavorite } from '../../actions';
import { redirectToUrl } from '../../actions';
import { favoriteArticle, unfavoriteArticle } from '../../actions';
import PropTypes from 'prop-types';

class FavoriteButton extends Component {
  toggleFavorite = (favorited, slug) => event => {
    event.preventDefault();
    const { currentUser, params } = this.props;

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
    const { favorited, slug, children, favoriting } = this.props;

    return (
      <button
        className={cx(
          'btn btn-sm',
          { 'btn-primary': favorited },
          { 'btn-outline-primary': !favorited }
        )}
        onClick={this.toggleFavorite(favorited, slug)}
        disabled={favoriting}
      >
        {children}
      </button>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.app.currentUser,
});

FavoriteButton.propTypes = {
  currentUser: PropTypes.object,
  favorited: PropTypes.bool,
  slug: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
  favoriting: PropTypes.bool,
};

export default connect(mapStateToProps, {
  favorite,
  unfavorite,
  favoriteArticle,
  unfavoriteArticle,
  redirectToUrl,
})(FavoriteButton);
