import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setPage } from '../../actions/articleList';
import cx from 'classnames';
import PropTypes from 'prop-types';

class Pagination extends Component {
  setPage = page => event => {
    event.preventDefault();

    this.props.setPage(page);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  render() {
    const { articlesCount, currentPage, limit } = this.props;
    const range = Array.from(
      new Array(Math.ceil(articlesCount / limit)),
      (val, idx) => ++idx
    );

    if (articlesCount <= limit) {
      return null;
    }

    return (
      <nav>
        <ul className="pagination">
          {range.map(page => (
            <li
              className={cx('page-item', { active: page === currentPage })}
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

const mapStateToProps = ({ articleList }) => ({
  articlesCount: articleList.articlesCount,
  currentPage: articleList.currentPage,
  limit: articleList.limit,
});

Pagination.propTypes = {
  articlesCount: PropTypes.number,
  currentPage: PropTypes.number,
  limit: PropTypes.number,
};

export default connect(mapStateToProps, { setPage })(Pagination);
