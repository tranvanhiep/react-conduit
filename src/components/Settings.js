import React, { Component } from 'react';
import { connect } from 'react-redux';
import ErrorsList from './common/ErrorsList';
import { loadSettings, unloadSettings, updateUser } from '../actions';
import { logout } from '../actions';
import PropTypes from 'prop-types';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      image: '',
      email: '',
      bio: '',
      password: '',
    };
  }

  componentDidMount() {
    const {
      currentUser: { image, username, email, bio },
    } = this.props;

    this.props.loadSettings();
    this.setState(state => ({
      ...state,
      image,
      username,
      email,
      bio,
    }));
  }

  componentWillUnmount() {
    this.props.unloadSettings();
  }

  onChange = field => event => {
    event.preventDefault();
    const value = event.currentTarget.value;

    this.setState(state => ({ ...state, [field]: value }));
  };

  submit = event => {
    event.preventDefault();
    const user = { ...this.state };

    this.props.updateUser(user);
  };

  render() {
    const { errors, inProgress } = this.props;
    const { image, username, email, bio, password } = this.state;
    const invalid = !username || !email || !password;

    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              <ErrorsList errors={errors} />
              <form onSubmit={this.submit}>
                <fieldset disabled={inProgress}>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL of profile picture"
                      value={image}
                      onChange={this.onChange('image')}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      value={username}
                      onChange={this.onChange('username')}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows="8"
                      placeholder="Short bio about you"
                      value={bio}
                      onChange={this.onChange('bio')}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={this.onChange('email')}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      password={password}
                      onChange={this.onChange('password')}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={invalid}
                  >
                    Update Settings
                  </button>
                </fieldset>
              </form>

              <hr />

              <button
                className="btn btn-outline-danger"
                onClick={this.props.logout}
              >
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.app.currentUser,
});

Settings.propTypes = {
  inProgress: PropTypes.bool,
  errors: PropTypes.shape({
    body: PropTypes.arrayOf(PropTypes.string),
  }),
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    token: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
  }),
};

export default connect(mapStateToProps, {
  loadSettings,
  unloadSettings,
  updateUser,
  logout,
})(Settings);
