import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorsList from './ErrorsList';
import { connect } from 'react-redux';
import { updateFieldAuth, login, unloadLoginPage } from '../actions/auth';

class Login extends Component {
  onChangeEmail = event => {
    this.props.updateFieldAuth('email', event.target.value);
  };

  onChangePassword = event => {
    this.props.updateFieldAuth('password', event.target.value);
  };

  submit = (email, password) => event => {
    event.preventDefault();
    this.props.login(email, password);
  };

  componentWillUnmount() {
    this.props.unloadLoginPage();
  }

  render() {
    const { email, password, errors, inProgress } = this.props;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link to="/register">Need an account?</Link>
              </p>

              <ErrorsList errors={errors} />

              <form onSubmit={this.submit(email, password)}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={this.onChangeEmail}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right" type="submit"
                disabled={inProgress}>
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.auth });

export default connect(
  mapStateToProps,
  { updateFieldAuth, login, unloadLoginPage }
)(Login);
