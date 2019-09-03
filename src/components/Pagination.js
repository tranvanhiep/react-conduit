import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPage } from '../actions/articleList';

class Pagination extends Component {
  setPage = page => event => {
    const { pager } = this.props;
    event.preventDefault();
    this.props.setPage(page, pager);
  };

  render() {
    const { articlesCount, currentPage } = this.props;
    const range = Array.from(new Array(Math.ceil(articlesCount / 10)), (val, idx) => ++idx);

    if (articlesCount <= 10) {
      return null;
    }

    return (
      <nav>
        <ul className="pagination">
          {range.map(page => (
            <li
              className={`page-item ${page === currentPage ? 'active' : ''}`}
              key={page.toString()}
            >
              <button className="page-link" onClick={this.setPage(page - 1)}>
                {page}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default connect(
  null,
  { setPage }
)(Pagination);
