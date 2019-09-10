import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ErrorsList from '../common/ErrorsList';
import { addComment } from '../../actions/article';

class CommentInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  onTextareaChange = event => {
    event.preventDefault();
    this.setState({ content: event.currentTarget.value });
  };

  submit = event => {
    const {
      article: { slug },
    } = this.props;
    event.preventDefault();
    this.props.addComment(slug, this.state.content);
    this.setState({ content: '' });
  };

  render() {
    const { currentUser, commentErrors } = this.props;

    if (!currentUser) {
      return (
        <p>
          <Link to="/login">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="/register">sign up</Link>
          &nbsp;to add comments on this article.
        </p>
      );
    }

    return (
      <Fragment>
        <ErrorsList errors={commentErrors} />
        <form className="card comment-form" onSubmit={this.submit}>
          <div className="card-block">
            <textarea
              className="form-control"
              placeholder="Write a comment..."
              rows="3"
              value={this.state.content}
              onChange={this.onTextareaChange}
            ></textarea>
          </div>
          <div className="card-footer">
            <img
              src={currentUser.image}
              alt={currentUser.username}
              className="comment-author-img"
            />
            <button className="btn btn-sm btn-primary" type="submit">
              Post Comment
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  commentErrors: state.article.commentErrors,
  currentUser: state.common.currentUser,
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentInput);
