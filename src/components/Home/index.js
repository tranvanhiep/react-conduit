import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadHomePage, unloadHomePage } from '../../actions/home';
import { setTagFilter } from '../../actions/articleList';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';
import { FEED_ARTICLES, ALL_ARTICLES } from '../../constants/constants';
import PropTypes from 'prop-types';

class Home extends Component {
  componentDidMount() {
    const { currentUser } = this.props;

    this.props.loadHomePage(currentUser ? FEED_ARTICLES : ALL_ARTICLES, 10);
  }

  componentWillUnmount() {
    this.props.unloadHomePage();
  }

  render() {
    const { currentUser, appName, tags, setTagFilter, loading } = this.props;

    return (
      <div className="home-page">
        <Banner currentUser={currentUser} appName={appName} />
        <div className="container page">
          <div className="row">
            <MainView />
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <Tags
                  tags={tags}
                  onSelectTag={setTagFilter}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  appName: state.common.appName,
  tags: state.articleList.tags,
  loading: state.articleList.loading,
});

Home.propTypes = {
  currentUser: PropTypes.object,
  appName: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  setTagFilter: PropTypes.func,
};

export default connect(mapStateToProps, {
  loadHomePage,
  unloadHomePage,
  setTagFilter,
})(Home);
