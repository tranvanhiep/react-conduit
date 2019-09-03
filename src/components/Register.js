import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorsList from './ErrorsList';
import { connect } from 'react-redux';
import { updateFieldAuth, register, unloadRegisterPage } from '../actions/auth';

class Register extends Component {
  onChangeUsername = event => {
    this.props.updateFieldAuth('username', event.target.value);
  };

  onChangeEmail = event => {
    this.props.updateFieldAuth('email', event.target.value);
  };

  onChangePassword = event => {
    this.props.updateFieldAuth('password', event.target.value);
  };

  submit = (username, email, password) => event => {
    event.preventDefault();
    this.props.register(username, email, password);
  };

  componentWillUnmount() {
    this.props.unloadRegisterPage();
  }

  render() {
    const { username, email, password, errors, inProgress } = this.props;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>

              <ErrorsList errors={errors} />

              <form onSubmit={this.submit(username, email, password)}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    value={username}
                    onChange={this.onChangeUsername}
                    disabled={inProgress}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={this.onChangeEmail}
                    disabled={inProgress}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChangePassword}
                    disabled={inProgress}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={inProgress || !email || !password || !username}
                >
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
  { updateFieldAuth, register, unloadRegisterPage }
)(Register);
