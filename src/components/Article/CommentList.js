import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';
import PropTypes from 'prop-types';

class CommentList extends Component {
  render() {
    const { comments, slug, currentUser } = this.props;

    if (!comments.length) {
      return null;
    }

    return (
      <Fragment>
        {comments.map(comment => (
          <Comment
            comment={comment}
            slug={slug}
            currentUser={currentUser}
            key={comment.id}
          />
        ))}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.article.comments,
});

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  slug: PropTypes.string,
  currentUser: PropTypes.object,
};

export default connect(mapStateToProps)(CommentList);
