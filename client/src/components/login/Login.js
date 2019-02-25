import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import Logo from "../../img/logo.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //To redirect to dashboard when logged in
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="dark-overlay login-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <img src={Logo} alt="logo" className="img-responsive" style={{ width: 350, height: 350, position: "relative" }} />
                <div className="login-form">
                  <div className="row">
                    <div className="col-md-6 m-auto">
                      <form noValidate onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <input type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} className={classnames("form-control form-control-lg", { "is-invalid": errors.email })} />
                          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                          <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} className={classnames("form-control form-control-lg", { "is-invalid": errors.password })} />
                          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <button type="submit" className="btn btn-login btn-block mt-4">
                          Login
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
