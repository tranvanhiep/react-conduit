import React, { Component, Fragment } from 'react';
import ArticlePreview from './ArticlePreview';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ArticleList extends Component {
  render() {
    const { articles, articleLoading, loading } = this.props;

    if (articleLoading || loading) {
      return <div className="article-preview">Loading...</div>;
    }

    if ((!articleLoading || !loading) && articles.length === 0) {
      return <div className="article-preview">No articles are here... yet</div>;
    }

    return (
      <Fragment>
        {articles.map(article => (
          <ArticlePreview article={article} key={article.slug} />
        ))}
        <Pagination />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ ...state.articleList });

ArticleList.propTypes = {
  loading: PropTypes.bool,
  articleLoading: PropTypes.bool,
  articles: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps, null)(ArticleList);
