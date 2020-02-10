import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleList from '../common/ArticleList';
import PropTypes from 'prop-types';
import { ALL } from '../../constants';

class ProfileFavorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: ALL,
      filters: {
        favorited: '',
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
    const favoriteConfig = { ...config, filters: { favorited: username } };

    return <ArticleList config={favoriteConfig} limit={limit} />;
  }
}

const mapStateToProps = state => ({ ...state.profile });

ProfileFavorite.propTypes = {
  profile: PropTypes.object,
};

export default connect(mapStateToProps)(ProfileFavorite);
