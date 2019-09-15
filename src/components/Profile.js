import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { loadAuthorArticle, loadFavoriteArticle, unloadProfile } from '../actions/profile';
import ArticleList from './common/ArticleList';
import FollowButton from './common/FollowButton';

const ProfileAction = ({ currentUser, username, following }) => {
  if (currentUser.username === username) {
    return (
      <Link className="btn btn-sm btn-outline-secondary action-btn" to="/settings">
        <i className="ion-gear-a"></i>
        &nbsp; Edit Profile Settings
      </Link>
    );
  } else {
    return <FollowButton username={username} following={following} />;
  }
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      match: {
        params: { username },
        path,
      },
    } = this.props;

    if (/.*favorites/.test(path)) {
      this.props.loadFavoriteArticle(username);
    } else {
      this.props.loadAuthorArticle(username);
    }
  }

  componentWillUnmount() {
    this.props.unloadProfile();
  }

  changeTab = (username, tab) => event => {
    if (tab === 'favorites') {
      this.props.loadFavoriteArticle(username);
    }

    if (tab === 'author') {
      this.props.loadAuthorArticle(username);
    }
  };

  render() {
    const { profile, currentUser, articles, articlesCount, currentPage, pager } = this.props;

    if (!profile) {
      return null;
    }

    const { username, bio, image, following } = profile;

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
                      onClick={this.changeTab(username, 'author')}
                    >
                      My Articles
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to={`/profile/${username}/favorites`}
                      onClick={this.changeTab(username, 'favorites')}
                    >
                      Favorited Articles
                    </NavLink>
                  </li>
                </ul>
              </div>
              <ArticleList
                articles={articles}
                articlesCount={articlesCount}
                currentPage={currentPage}
                pager={pager}
              />
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
  ...state.articleList,
});

export default connect(
  mapStateToProps,
  { loadAuthorArticle, loadFavoriteArticle, unloadProfile }
)(Profile);
