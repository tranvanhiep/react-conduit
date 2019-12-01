import React, { Fragment, Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import { resetRedirect } from '../actions/common';
import { push } from 'react-router-redux';
import agent from '../agent';
import { loadApp } from '../actions/common';
import Article from './Article';
import Editor from './Editor';
import Settings from './Settings';
import Profile from './Profile';
import { TOKEN_KEY } from '../constants/constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const token = window.localStorage.getItem(TOKEN_KEY);

    if (token) {
      agent.setToken(token);
    }
    this.props.loadApp();
  }

  componentDidUpdate(prevProps, prevState) {
    const { redirectTo, dispatch, resetRedirect } = this.props;

    if (redirectTo) {
      dispatch(push(redirectTo));
      resetRedirect();
    }
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
          <Route path="/editor/:slug">{currentUser ? <Editor /> : <Redirect to="/" />}</Route>
          <Route path="/editor">{currentUser ? <Editor /> : <Redirect to="/" />}</Route>
          <Route path="/settings">{currentUser ? <Settings /> : <Redirect to="/" />}</Route>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
