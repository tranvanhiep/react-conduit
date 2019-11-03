import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { unloadProfile, loadProfilePage } from '../actions/profile';
import ArticleList from './common/ArticleList';
import FollowButton from './common/FollowButton';
import { loadAuthorArticle, resetArticleList } from '../actions/articleList';
import { FAVORITE_ARTICLES, AUTHOR_ARTICLES } from '../constants/constants';

const ProfileAction = ({ currentUser, username, following, followRequesting, params }) => {
  if (currentUser && currentUser.username === username) {
    return (
      <Link className="btn btn-sm btn-outline-secondary action-btn" to="/settings">
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
    const { limit } = this.state;

    this.props.loadProfilePage(username);

    if (/\/favorites/.test(path)) {
      this.props.loadAuthorArticle(FAVORITE_ARTICLES, username, limit);
    } else {
      this.props.loadAuthorArticle(AUTHOR_ARTICLES, username, limit);
    }
  }

  static getDerivedStateFromProps(props, state) {
    const {
      match: {
        params: { username },
        path,
      },
      profileLoading,
      profile,
    } = props;
    const { limit } = state;

    if (!profileLoading && profile) {
      const { username: prevUsername } = profile;

      if (username !== prevUsername) {
        props.loadProfilePage(username);
        if (/\/favorites/.test(path)) {
          props.loadAuthorArticle('favorites', username, limit);
        } else {
          props.loadAuthorArticle('author', username, limit);
        }
      }
    }

    return null;
  }

  componentWillUnmount() {
    this.props.unloadProfile();
  }

  onChangeTab = (tab, username) => event => {
    const { limit } = this.state;

    this.props.resetArticleList();
    this.props.loadAuthorArticle(tab, username, limit);
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
                      onClick={this.onChangeTab(AUTHOR_ARTICLES, username)}
                    >
                      My Articles
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={`/profile/${username}/favorites`}
                      onClick={this.onChangeTab(FAVORITE_ARTICLES, username)}
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

export default connect(
  mapStateToProps,
  { loadAuthorArticle, unloadProfile, loadProfilePage, resetArticleList }
)(Profile);
