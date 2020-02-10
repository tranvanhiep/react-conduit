import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadHomePage, unloadHomePage } from '../../actions';
import Banner from './Banner';
import MainView from './MainView';
import PropTypes from 'prop-types';

class Home extends Component {
  componentDidMount() {
    this.props.loadHomePage();
  }

  componentWillUnmount() {
    this.props.unloadHomePage();
  }

  render() {
    const { currentUser, appName } = this.props;

    return (
      <div className="home-page">
        <Banner currentUser={currentUser} appName={appName} />
        <div className="container page">
          <div className="row">
            <MainView />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.app.currentUser,
  appName: state.app.appName,
});

Home.propTypes = {
  currentUser: PropTypes.object,
  appName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, {
  loadHomePage,
  unloadHomePage,
})(Home);
