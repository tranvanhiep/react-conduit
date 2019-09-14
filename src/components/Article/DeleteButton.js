import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/article';

class DeleteButton extends Component {
  deleteComment = event => {
    event.preventDefault();
    const { id, slug } = this.props;

    this.props.deleteComment(slug, id);
  };
  render() {
    const { username, currentUser } = this.props;

    if (!currentUser || username !== currentUser.username) {
      return null;
    }

    return (
      <span className="mod-options" onClick={this.deleteComment}>
        <i className="ion-trash-a"></i>
      </span>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(DeleteButton);
