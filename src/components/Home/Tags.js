import React, { Component } from 'react';
import agent from '../../agent';

class Tags extends Component {
  applyFilterTag = tag => event => {
    event.preventDefault();
    this.props.onSelectTag(tag, agent.Articles.byTag, 10);
  };

  render() {
    const { tags } = this.props;

    if (!tags) {
      return <div>Loading tags...</div>;
    }

    return (
      <div className="tag-list">
        {tags.map(tag => (
          <button key={tag} className="tag-pill tag-default" onClick={this.applyFilterTag(tag)}>
            {tag}
          </button>
        ))}
      </div>
    );
  }
}

export default Tags;
