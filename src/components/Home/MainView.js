import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTab } from '../../actions/articleList';
import ArticleList from '../common/ArticleList';
import cx from 'classnames';
import { redirectToUrl } from '../../actions/common';

const YourFeedTab = ({ token, tab, onChangeTab, redirectToUrl }) => {
  let changeTab;

  if (token) {
    changeTab = () => onChangeTab('feed');
  } else {
    changeTab = () => redirectToUrl('/login');
  }

  return (
    <li className="nav-item">
      <button className={cx('nav-link', { active: tab === 'feed' })} onClick={changeTab}>
        Your Feed
      </button>
    </li>
  );
};

const GlobalFeedTab = ({ tab, onChangeTab }) => {
  return (
    <li className="nav-item">
      <button className={cx('nav-link', { active: tab === 'all' })} onClick={onChangeTab('all')}>
        Global Feed
      </button>
    </li>
  );
};

const TagFilterTab = ({ tag }) => {
  if (!tag) {
    return null;
  }

  return (
    <li class="nav-item">
      <button class="nav-link active">
        <i className="ion-pound"></i> {tag}
      </button>
    </li>
  );
};

class MainView extends Component {
  handleChangeTab = tab => event => {
    event.preventDefault();
    this.props.changeTab(tab);
  };

  render() {
    const { articles, articlesCount, currentPage, tag, token, tab, pager } = this.props;

    return (
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active">
            <YourFeedTab
              token={token}
              tab={tab}
              onChangeTab={this.handleChangeTab}
              redirectToUrl={this.props.redirectToUrl}
            />
            <GlobalFeedTab tab={tab} onChangeTab={this.handleChangeTab} />
            <TagFilterTab tag={tag} />
          </ul>
        </div>
        <ArticleList
          articles={articles}
          articlesCount={articlesCount}
          currentPage={currentPage}
          pager={pager}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.articleList,
  token: state.common.token,
  currentUser: state.common.currentUser,
});

export default connect(
  mapStateToProps,
  { changeTab, redirectToUrl }
)(MainView);
