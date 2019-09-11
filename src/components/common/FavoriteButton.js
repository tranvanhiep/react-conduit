import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { favorite, unfavorite } from '../../actions/article';
import { redirectToUrl } from '../../actions/common';

class FavoriteButton extends Component {
  toggleFavorite = (favorited, slug, from) => event => {
    const { currentUser } = this.props;

    event.preventDefault();
    event.currentTarget.blur();

    if (currentUser) {
      if (favorited) {
        this.props.unfavorite(slug, from);
      } else {
        this.props.favorite(slug, from);
      }
    } else {
      this.props.redirectToUrl('/login');
    }
  };

  render() {
    const { favorited, slug, children, from } = this.props;

    return (
      <button
        className={cx(
          'btn btn-sm',
          { 'btn-primary': favorited },
          { 'btn-outline-primary': !favorited }
        )}
        onClick={this.toggleFavorite(favorited, slug, from)}
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
