import React, { Component, Fragment } from 'react';
import ArticlePreview from './ArticlePreview';
import { connect } from 'react-redux';
import cx from 'classnames';
import { loadArticles, unloadArticles } from '../../actions';
import PropTypes from 'prop-types';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.runQuery();
  }

  componentWillUnmount() {
    this.props.unloadArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    const { config: prevConfig } = prevProps;
    const { config } = this.props;

    if (config && this.diffChecker(prevConfig, config)) {
      this.runQuery();
    }
  }

  diffChecker = (prev, curr) => {
    if (!prev || curr.type !== prev.type) {
      return true;
    }

    const prevFilters = Object.keys(prev.filters);
    const currFilters = Object.keys(curr.filters);

    if (prevFilters.length >= currFilters.length) {
      return !prevFilters.every(key => {
        if (prev.filters[key] !== curr.filters[key]) {
          return false;
        }
        return true;
      });
    } else {
      return !currFilters.every(key => {
        if (prev.filters[key] !== curr.filters[key]) {
          return false;
        }
        return true;
      });
    }
  };

  runQuery = (page = 1) => {
    const { limit, config } = this.props;
    if (config) {
      const { filters } = config;
      const offset = limit * (page - 1);
      this.props.loadArticles({
        ...config,
        filters: { ...filters, offset, limit },
      });
    }
  };

  setPage = page => event => {
    event.preventDefault();

    this.setState(state => ({ ...state, currentPage: page }));
    this.runQuery(page);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  render() {
    const { articles, loading, articlesCount, limit, favoriting } = this.props;
    const pagination = Array.from(
      new Array(Math.ceil(articlesCount / limit)),
      (val, idx) => ++idx
    );
    const { currentPage } = this.state;

    if (loading) {
      return <div className="article-preview">Loading...</div>;
    }

    if (!loading && articles && articles.length === 0) {
      return <div className="article-preview">No articles are here... yet</div>;
    }

    return (
      <Fragment>
        {articles &&
          articles.map(article => (
            <ArticlePreview
              article={article}
              favoriting={favoriting}
              key={article.slug}
            />
          ))}
        <nav>
          <ul className="pagination">
            {pagination &&
              pagination.length > 1 &&
              pagination.map(page => (
                <li
                  className={cx('page-item', {
                    active: page === currentPage,
                  })}
                  key={page.toString()}
                >
                  <button className="page-link" onClick={this.setPage(page)}>
                    {page}
                  </button>
                </li>
              ))}
          </ul>
        </nav>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ ...state.articleList });

ArticleList.propTypes = {
  loading: PropTypes.bool,
  articles: PropTypes.arrayOf(PropTypes.object),
  config: PropTypes.shape({
    type: PropTypes.string,
    filters: PropTypes.shape({
      tag: PropTypes.string,
      author: PropTypes.string,
      favorited: PropTypes.string,
      limit: PropTypes.number,
      offset: PropTypes.number,
    }),
  }).isRequired,
  limit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, { loadArticles, unloadArticles })(
  ArticleList
);
