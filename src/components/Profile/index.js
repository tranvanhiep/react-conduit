import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import { unloadProfile, loadProfilePage, redirectToUrl } from '../../actions';
import FollowButton from '../common/FollowButton';
import ProfileArticle from './ProfileArticle';
import ProfileFavorite from './ProfileFavorite';
import PropTypes from 'prop-types';

const ProfileAction = ({ currentUser, author, following, params }) => {
  const { username } = author;
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
      <FollowButton author={author} following={following} params={params} />
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
      },
    } = this.props;

    this.props.loadProfilePage(username);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      match: {
        params: { username: prevUsername },
      },
    } = prevProps;
    const {
      match: {
        params: { username },
      },
      loading,
      profile,
      errors,
    } = this.props;

    if (!loading && profile) {
      if (username !== prevUsername) {
        this.props.loadProfilePage(username);
      }
    }

    if (errors) {
      redirectToUrl('/');
    }
  }

  componentWillUnmount() {
    this.props.unloadProfile();
  }

  render() {
    const {
      profile,
      loading,
      currentUser,
      match: { params },
      following,
    } = this.props;

    if (loading || !profile) {
      return null;
    }

    const { username, bio, image } = profile;

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
                  author={profile}
                  following={following}
                  currentUser={currentUser}
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

              <Switch>
                <Route
                  path="/profile/:username/favorites"
                  component={ProfileFavorite}
                />
                <Route path="/profile/:username" component={ProfileArticle} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.profile,
  currentUser: state.app.currentUser,
});

Profile.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    following: PropTypes.bool,
  }),
  following: PropTypes.bool,
  loading: PropTypes.bool,
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    token: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default connect(mapStateToProps, {
  unloadProfile,
  loadProfilePage,
  redirectToUrl,
})(Profile);
