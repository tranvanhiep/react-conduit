import React, { Component } from 'react';
import * as cx from 'classnames';
import styles from './tags.module.scss';
import PropTypes from 'prop-types';

class Tags extends Component {
  render() {
    const { tags, loading, setConfig } = this.props;

    if (loading || !tags) {
      return <div>Loading tags...</div>;
    }

    return (
      <div className="tag-list">
        {tags.map(tag => (
          <button
            key={tag}
            className={cx('tag-pill tag-default', styles['btn-tag'])}
            onClick={setConfig(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    );
  }
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  setConfig: PropTypes.func.isRequired,
};

export default Tags;
