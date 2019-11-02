import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeTab, resetArticleList } from '../../actions/articleList';
import ArticleList from '../common/ArticleList';
import cx from 'classnames';
import { redirectToUrl } from '../../actions/common';

const YourFeedTab = ({ currentUser, tab, onChangeTab, redirectToUrl }) => {
  let changeTab;

  if (currentUser) {
    changeTab = onChangeTab('feed');
  } else {
    changeTab = () => redirectToUrl('/login');
  }

  return (
    <li className="nav-item">
      <button
        className={cx('nav-link', { active: tab === 'feed' })}
        onClick={changeTab}
        disabled={tab === 'feed'}
      >
        Your Feed
      </button>
    </li>
  );
};

const GlobalFeedTab = ({ tab, onChangeTab }) => {
  return (
    <li className="nav-item">
      <button
        className={cx('nav-link', { active: tab === 'all' })}
        onClick={onChangeTab('all')}
        disabled={tab === 'all'}
      >
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
    <li className="nav-item">
      <button className="nav-link active">
        <i className="ion-pound"></i> {tag}
      </button>
    </li>
  );
};

class MainView extends Component {
  handleChangeTab = tab => event => {
    event.preventDefault();
    this.props.resetArticleList();
    this.props.changeTab(tab, 10);
  };

  render() {
    const { tag, currentUser, tab } = this.props;

    return (
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active">
            <YourFeedTab
              currentUser={currentUser}
              tab={tab}
              onChangeTab={this.handleChangeTab}
              redirectToUrl={this.props.redirectToUrl}
            />
            <GlobalFeedTab tab={tab} onChangeTab={this.handleChangeTab} />
            <TagFilterTab tag={tag} />
          </ul>
        </div>
        <ArticleList />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
});

export default connect(
  mapStateToProps,
  { changeTab, redirectToUrl, resetArticleList }
)(MainView);
