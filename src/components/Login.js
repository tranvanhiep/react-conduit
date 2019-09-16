import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorsList from './common/ErrorsList';
import { connect } from 'react-redux';
import { login, unloadLoginPage } from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onChangeField = field => event => {
    event.preventDefault();
    const value = event.currentTarget.value;

    this.setState(state => ({ ...state, [field]: value }));
  };

  submit = (email, password) => event => {
    event.preventDefault();
    this.props.login(email, password);
  };

  componentWillUnmount() {
    this.props.unloadLoginPage();
  }

  render() {
    const { errors, inProgress } = this.props;
    const { email, password } = this.state;

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
                <fieldset disabled={inProgress}>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={this.onChangeField('email')}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.onChangeField('password')}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={!email || !password}
                  >
                    Sign in
                  </button>
                </fieldset>
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
  { login, unloadLoginPage }
)(Login);
