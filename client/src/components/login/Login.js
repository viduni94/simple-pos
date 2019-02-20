import React, { Component } from "react";
import Logo from "../../img/logo.png";
import axios from "axios";
import classnames from "classnames";

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

  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("/login", user)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
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
                        <button type="submit" className="btn btn-submit btn-block mt-4">
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

export default Login;
