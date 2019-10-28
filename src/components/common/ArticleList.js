import React, { Component, Fragment } from 'react';
import ArticlePreview from './ArticlePreview';
import Pagination from './Pagination';

class ArticleList extends Component {
  render() {
    const {
      articles,
      articlesCount,
      currentPage,
      pager,
      limit,
      articleLoading,
      loading,
    } = this.props;

    if (articleLoading || loading) {
      return <div className="article-preview">Loading...</div>;
    }

    if (articles.length === 0) {
      return <div className="article-preview">No articles are here... yet</div>;
    }

    return (
      <Fragment>
        {articles.map(article => (
          <ArticlePreview article={article} key={article.slug} />
        ))}
        <Pagination
          articlesCount={articlesCount}
          currentPage={currentPage}
          pager={pager}
          limit={limit}
        />
      </Fragment>
    );
  }
}

export default ArticleList;
