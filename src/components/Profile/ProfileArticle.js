import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleList from '../common/ArticleList';
import Proptypes from 'prop-types';
import { ALL } from '../../constants';

class ProfileArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: ALL,
        filters: {
          author: '',
        },
      },
      limit: 10,
    };
  }

  render() {
    const { config, limit } = this.state;
    const { profile } = this.props;

    if (!profile) {
      return null;
    }

    const { username } = profile;
    const articleConfig = { ...config, filters: { author: username } };

    return <ArticleList config={articleConfig} limit={limit} />;
  }
}

const mapStateToProps = state => ({ ...state.profile });

ProfileArticle.propTypes = {
  profile: Proptypes.object,
};

export default connect(mapStateToProps)(ProfileArticle);
