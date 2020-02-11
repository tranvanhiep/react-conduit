import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ArticleList from '../common/ArticleList';
import Tags from './Tags';
import cx from 'classnames';
import { redirectToUrl } from '../../actions';
import PropTypes from 'prop-types';

const YourFeedTab = ({ type, setConfig }) => {
  return (
    <li className="nav-item">
      <button
        className={cx('nav-link', { active: type === 'feed' })}
        onClick={setConfig}
        disabled={type === 'feed'}
      >
        Your Feed
      </button>
    </li>
  );
};

const GlobalFeedTab = ({ type, tag, setConfig }) => {
  return (
    <li className="nav-item">
      <button
        className={cx('nav-link', { active: type === 'all' && !tag })}
        onClick={setConfig}
        disabled={type === 'all' && !tag}
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
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: '',
        filters: {
          tag: '',
        },
      },
      limit: 10,
    };
  }

  componentDidMount() {
    const { currentUser } = this.props;
    if (currentUser) {
      this.setState(state => ({
        ...state,
        config: { ...state.config, type: 'feed' },
      }));
    }
  }

  loadGlobalArticles = event => {
    event.preventDefault();
    this.setState(state => ({
      ...state,
      config: { type: 'all', filters: {} },
    }));
  };

  loadFeedArticles = event => {
    event.preventDefault();
    const { currentUser } = this.props;

    if (currentUser) {
      this.setState(state => ({
        ...state,
        config: { type: 'feed', filters: {} },
      }));
    } else {
      this.props.redirectToUrl('/login');
    }
  };

  loadTagArticles = tag => event => {
    event.preventDefault();
    this.setState(state => ({
      ...state,
      config: { type: 'all', filters: { tag } },
    }));
  };

  render() {
    const { tags, loading } = this.props;
    const { config, limit } = this.state;
    const {
      type,
      filters: { tag },
    } = config;

    return (
      <Fragment>
        <div className="col-md-9">
          <div className="feed-toggle">
            <ul className="nav nav-pills outline-active">
              <YourFeedTab type={type} setConfig={this.loadFeedArticles} />
              <GlobalFeedTab
                type={type}
                tag={tag}
                setConfig={this.loadGlobalArticles}
              />
              <TagFilterTab tag={tag} setConfig={this.loadTagArticles} />
            </ul>
          </div>
          <ArticleList config={config} limit={limit} />
        </div>
        <div className="col-md-3">
          <div className="sidebar">
            <p>Popular Tags</p>
            <Tags
              tags={tags}
              setConfig={this.loadTagArticles}
              loading={loading}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state.home,
  currentUser: state.app.currentUser,
});

MainView.propTypes = {
  currentUser: PropTypes.object,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default connect(mapStateToProps, {
  redirectToUrl,
})(MainView);
