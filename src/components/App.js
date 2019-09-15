import React, { Fragment, Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import { resetRedirect } from '../actions/common';
import { push } from 'connected-react-router';
import agent from '../agent';
import { loadApp } from '../actions/common';
import Article from './Article';
import Editor from './Editor';
import Settings from './Settings';
import Profile from './Profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps) {
    const { redirectTo, dispatch, resetRedirect } = nextProps;

    if (redirectTo) {
      dispatch(push(redirectTo));
      resetRedirect();
    }

    return null;
  }

  componentDidMount() {
    const token = window.localStorage.getItem('jwt');

    if (token) {
      agent.setToken(token);
    }
    this.props.loadApp(token);
  }

  render() {
    const { appName, appLoaded, currentUser } = this.props;

    if (!appLoaded) {
      return (
        <Fragment>
          <Header appName={appName} currentUser={currentUser} />
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Header appName={appName} currentUser={currentUser} />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/article/:slug" component={Article} />
          <Route path="/editor/:slug" component={Editor} />
          <Route path="/editor" component={Editor} />
          <Route path="/settings" component={Settings} />
          <Route path="/profile/:username/favorites" component={Profile} />
          <Route path="/profile/:username" component={Profile} />
        </Switch>
        <Footer appName={appName} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { appName, redirectTo, appLoaded, currentUser } = state.common;
  return {
    appName,
    redirectTo,
    appLoaded,
    currentUser,
  };
};

const mapDispatchToProps = dispatch => ({
  loadApp: token => dispatch(loadApp(token)),
  resetRedirect: () => dispatch(resetRedirect()),
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
