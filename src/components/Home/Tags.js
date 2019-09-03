import React, { Component } from 'react';

class Tags extends Component {
  render() {
    const { tags } = this.props;

    if (!tags) {
      return <div>Loading tags...</div>;
    }

    return (
      <div className="tag-list">
        {tags.map(tag => (
          <button key={tag} className="tag-pill tag-default">
            {tag}
          </button>
        ))}
      </div>
    );
  }
}

export default Tags;
