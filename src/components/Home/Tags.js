import React, { Component } from 'react';
import agent from '../../agent';
import * as cx from 'classnames';
import styles from './tags.module.scss';
import PropTypes from 'prop-types';

class Tags extends Component {
  applyFilterTag = tag => event => {
    event.preventDefault();
    this.props.onSelectTag(tag, agent.Articles.byTag, 10);
  };

  render() {
    const { tags, loading } = this.props;

    if (loading || !tags) {
      return <div>Loading tags...</div>;
    }

    return (
      <div className="tag-list">
        {tags.map(tag => (
          <button
            key={tag}
            className={cx('tag-pill tag-default', styles['btn-tag'])}
            onClick={this.applyFilterTag(tag)}
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
};

export default Tags;
