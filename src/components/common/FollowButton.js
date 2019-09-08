import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { follow, unfollow } from '../../actions/profile';

class FollowButton extends Component {
  toggleFollow = (following, username) => event => {
    event.preventDefault();
    event.currentTarget.blur();

    if (following) {
      this.props.unfollow(username);
    } else {
      this.props.follow(username);
    }
  };

  render() {
    const { username, following } = this.props;

    return (
      <button
        className={cx('btn btn-sm', {
          'btn-outline-secondary': !following,
          'btn-secondary': following,
        })}
        onClick={this.toggleFollow(following, username)}
      >
        <i className="ion-plus-round"></i>
        &nbsp; {following ? 'Unfollow' : 'Follow'} {username}
      </button>
    );
  }
}

export default connect(
  null,
  { follow, unfollow }
)(FollowButton);
