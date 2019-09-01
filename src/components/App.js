import React, { Fragment, Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Login from './Login';

class App extends Component {
  render() {
    const {appName} = this.props;

    return (
      <Fragment>
        <Header appName={appName} />
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
        <Footer appName={appName} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({ ...state.common });

export default connect(mapStateToProps)(App);
