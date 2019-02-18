import React, { Component } from "react";
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

  onSubmit = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(user);
  };

  render() {
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
                      <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                          <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                          <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
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
