import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPage } from '../../actions/articleList';
import cx from 'classnames';

class Pagination extends Component {
  setPage = page => event => {
    event.preventDefault();
    const { pager } = this.props;

    this.props.setPage(page, pager);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
            <li className={cx('page-item', { active: page === currentPage })} key={page.toString()}>
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
