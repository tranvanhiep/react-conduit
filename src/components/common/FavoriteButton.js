import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { favorite, unfavorite } from '../../actions/article';
import { redirectToUrl } from '../../actions/common';

class FavoriteButton extends Component {
  toggleFavorite = (favorited, slug, pageName) => event => {
    event.preventDefault();
    const { currentUser } = this.props;

    event.currentTarget.blur();

    if (currentUser) {
      if (favorited) {
        this.props.unfavorite(slug, pageName);
      } else {
        this.props.favorite(slug, pageName);
      }
    } else {
      this.props.redirectToUrl('/login');
    }
  };

  render() {
    const { favorited, slug, children, pageName } = this.props;

    return (
      <button
        className={cx(
          'btn btn-sm',
          { 'btn-primary': favorited },
          { 'btn-outline-primary': !favorited }
        )}
        onClick={this.toggleFavorite(favorited, slug, pageName)}
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
  { favorite, unfavorite, redirectToUrl }
)(FavoriteButton);
