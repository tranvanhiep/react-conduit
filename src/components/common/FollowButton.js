import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { follow, unfollow } from '../../actions';
import { redirectToUrl } from '../../actions';
import { followProfile, unfollowProfile } from '../../actions';
import PropTypes from 'prop-types';

class FollowButton extends Component {
  toggleFollow = (following, username) => event => {
    event.preventDefault();
    const { currentUser, params } = this.props;

    event.currentTarget.blur();

    if (currentUser) {
      if (params && params.username) {
        if (following) {
          this.props.unfollow(username);
        } else {
          this.props.follow(username);
        }
      } else {
        if (following) {
          this.props.unfollowProfile(username);
        } else {
          this.props.followProfile(username);
        }
      }
    } else {
      this.props.redirectToUrl('/login');
    }
  };

  render() {
    const { username, following, followRequesting } = this.props;

    return (
      <button
        className={cx('btn btn-sm', {
          'btn-outline-secondary': !following,
          'btn-secondary': following,
        })}
        onClick={this.toggleFollow(following, username)}
        disabled={followRequesting}
      >
        <i className="ion-plus-round"></i>
        &nbsp; {following ? 'Unfollow' : 'Follow'} {username}
      </button>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.app.currentUser,
});

FollowButton.propType = {
  currentUser: PropTypes.object,
  username: PropTypes.string,
  following: PropTypes.bool,
  followRequesting: PropTypes.bool,
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  redirectToUrl,
  followProfile,
  unfollowProfile,
})(FollowButton);
