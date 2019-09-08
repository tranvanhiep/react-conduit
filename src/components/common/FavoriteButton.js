import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { favorite, unfavorite } from '../../actions/article';

class FavoriteButton extends Component {
  toggleFavorite = (favorited, slug, from) => event => {
    event.preventDefault();
    event.currentTarget.blur();

    if (favorited) {
      this.props.unfavorite(slug, from);
    } else {
      this.props.favorite(slug, from);
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

export default connect(
  null,
  { favorite, unfavorite }
)(FavoriteButton);
