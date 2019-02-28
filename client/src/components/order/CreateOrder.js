import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Menu from "../menu/Menu";

export class CreateOrder extends Component {
  constructor(props) {
    super(props);

    let curr = new Date();
    curr.setDate(curr.getDate());

    this.state = {
      orderDate: curr,
      itemCount: "",
      status: "",
      userId: "",
      customerId: "",
      orderItems: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="create-order">
        <div className="row custom-row">
          <div className="col-md-7 ml-3">
            <Menu />
          </div>
          <div className="col-md-4 ml-5">
            <h2 className="text-center mu-title">New Order Details</h2>
            <div className="row col-md-12">
              <div className="col-md-6">
                <button className="btn btn-normal btn-block mr-4 mt-4 mb-4">Add New Customer</button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-normal btn-block ml-4 mt-4 mb-4">Find Existing Customer</button>
              </div>
            </div>
            <small className="d-block pb-3">* = required fields</small>
            <form action="add-experience.html">
              <div className="form-group">
                <input type="text" className="form-control form-control-lg" value={this.state.customerId} name="customerId" onChange={this.onChange} required />
                <small className="form-text text-muted">Customer Id *</small>
              </div>
              <div className="form-group">
                <input type="text" className="form-control form-control-lg" value={this.state.orderDate.toISOString().substr(0, 10)} name="orderDate" required readOnly />
                <small className="form-text text-muted">Order Date *</small>
              </div>
              {/* <div className="form-group">
                <select className="form-control form-control-lg" name="status">
                  <option value="0">* Select Professional Status</option>
                  <option value="Developer">Developer</option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Manager">Manager</option>
                  <option value="Student or Learning">Student or Learning</option>
                  <option value="Instructor">Instructor or Teacher</option>
                  <option value="Intern">Intern</option>
                  <option value="Other">Other</option>
                </select>
                <small className="form-text text-muted">Give us an idea of where you are at in your career</small>
              </div> */}
              <div className="form-group">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Item</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row col-md-12">
                <div className="col-md-6">
                  <button type="submit" className="btn btn-secondary btn-block mr-4">
                    Cancel
                  </button>
                </div>
                <div className="col-md-6">
                  <button type="submit" className="btn btn-normal btn-block ml-4">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateOrder.propTpes = {
  order: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order,
  errors: state.errors
});

export default connect(mapStateToProps)(CreateOrder);
