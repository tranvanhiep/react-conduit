import React, { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Header appName="conduit" currentUser={false} />
        <Footer appName="conduit" />
      </Fragment>
    );
  }
}

export default App;
