import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadHomePage, unloadHomePage } from '../../actions/home';
import { setTagFilter } from '../../actions/articleList';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';

class Home extends Component {
  componentDidMount() {
    const { token } = this.props;

    this.props.loadHomePage(token ? 'feed' : 'all');
  }

  componentWillUnmount() {
    this.props.unloadHomePage();
  }

  render() {
    const { token, appName, tags, setTagFilter } = this.props;

    return (
      <div className="home-page">
        <Banner token={token} appName={appName} />
        <div className="container page">
          <div className="row">
            <MainView />
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <Tags tags={tags} onSelectTag={setTagFilter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.common.token,
  appName: state.common.appName,
  tags: state.articleList.tags,
});

export default connect(
  mapStateToProps,
  { loadHomePage, unloadHomePage, setTagFilter }
)(Home);
