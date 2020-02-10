import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions';
import * as cx from 'classnames';
import styles from './deleteButton.module.scss';
import PropTypes from 'prop-types';

class DeleteButton extends Component {
  deleteComment = event => {
    event.preventDefault();
    const { id, slug } = this.props;

    this.props.deleteComment(slug, id);
  };
  render() {
    const { username, currentUser, commentDeleting } = this.props;

    if (!currentUser || username !== currentUser.username) {
      return null;
    }

    return (
      <button
        className={cx('mod-options', styles['btn-delete'])}
        onClick={this.deleteComment}
        disabled={commentDeleting}
      >
        <i className="ion-trash-a"></i>
      </button>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.app.currentUser,
  commentDeleting: state.article.commentDeleting,
});

DeleteButton.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    token: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
  }),
  commentDeleting: PropTypes.bool,
  username: PropTypes.string,
  id: PropTypes.number,
  slug: PropTypes.string,
};

export default connect(mapStateToProps, { deleteComment })(DeleteButton);
