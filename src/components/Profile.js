import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { unloadProfile, loadProfilePage } from '../actions/profile';
import ArticleList from './common/ArticleList';
import FollowButton from './common/FollowButton';
import { loadAuthorArticle } from '../actions/articleList';
import { FAVORITE_ARTICLES, AUTHOR_ARTICLES } from '../constants/constants';
import PropTypes from 'prop-types';
import { redirectToUrl } from '../actions/app';

const ProfileAction = ({
  currentUser,
  username,
  following,
  followRequesting,
  params,
}) => {
  if (currentUser && currentUser.username === username) {
    return (
      <Link
        className="btn btn-sm btn-outline-secondary action-btn"
        to="/settings"
      >
        <i className="ion-gear-a"></i>
        &nbsp; Edit Profile Settings
      </Link>
    );
  } else {
    return (
      <FollowButton
        username={username}
        following={following}
        followRequesting={followRequesting}
        params={params}
      />
    );
  }
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { username },
        path,
      },
    } = this.props;

    this.props.loadProfilePage(username);
    this.switchTab(path, username);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      match: {
        params: { username: prevUsername },
        url: prevUrl,
      },
    } = prevProps;
    const {
      match: {
        params: { username },
        path,
        url,
      },
      profileLoading,
      profile,
      errors,
    } = this.props;

    if (!profileLoading && profile) {
      if (username !== prevUsername) {
        this.props.loadProfilePage(username);
      }
      if (url !== prevUrl) {
        this.switchTab(path, username);
      }
    }

    if (errors) {
      redirectToUrl('/');
    }
  }

  componentWillUnmount() {
    this.props.unloadProfile();
  }

  switchTab = (path, username) => {
    const { limit } = this.state;

    if (/\/favorites/.test(path)) {
      this.props.loadAuthorArticle(FAVORITE_ARTICLES, username, limit);
    } else {
      this.props.loadAuthorArticle(AUTHOR_ARTICLES, username, limit);
    }
  };

  render() {
    const {
      profile,
      profileLoading,
      currentUser,
      match: { params },
    } = this.props;

    if (profileLoading || !profile) {
      return null;
    }

    const { username, bio, image, following, followRequesting } = profile;

    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={image} alt={username} className="user-img" />
                <h4>{username}</h4>
                <p>{bio}</p>
                <ProfileAction
                  username={username}
                  following={following}
                  currentUser={currentUser}
                  followRequesting={followRequesting}
                  params={params}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      exact
                      to={`/profile/${username}`}
                      activeClassName="active"
                    >
                      My Articles
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={`/profile/${username}/favorites`}
                      activeClassName="active"
                    >
                      Favorited Articles
                    </NavLink>
                  </li>
                </ul>
              </div>
              <ArticleList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.profile,
  currentUser: state.common.currentUser,
});

Profile.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    following: PropTypes.bool,
    followRequesting: PropTypes.bool,
  }),
  profileLoading: PropTypes.bool,
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    token: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default connect(mapStateToProps, {
  loadAuthorArticle,
  unloadProfile,
  loadProfilePage,
  redirectToUrl,
})(Profile);
