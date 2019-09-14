import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { follow, unfollow } from '../../actions/profile';
import { redirectToUrl } from '../../actions/common';

class FollowButton extends Component {
  toggleFollow = (following, username) => event => {
    event.preventDefault();
    const { currentUser } = this.props;

    event.currentTarget.blur();

    if (currentUser) {
      if (following) {
        this.props.unfollow(username);
      } else {
        this.props.follow(username);
      }
    } else {
      this.props.redirectToUrl('/login');
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

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
});

export default connect(
  mapStateToProps,
  { follow, unfollow, redirectToUrl }
)(FollowButton);
