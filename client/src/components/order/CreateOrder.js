import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddCustomerModal from "../modals/AddCustomerModal";
import FindCustomerModal from "../modals/FindCustomerModal";

import { resetActiveCustomer } from "../../actions/customerActions";

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
      customerName: "",
      orderItems: "",
      errors: {},
      modal1: false,
      modal2: false,
      backdrop: true
    };
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
  }

  toggle1() {
    this.setState(prevState => ({
      modal1: !prevState.modal1
    }));
  }

  toggle2() {
    this.setState(prevState => ({
      modal2: !prevState.modal2
    }));
  }

  componentWillUnmount() {
    this.props.resetActiveCustomer();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let customer = JSON.parse(localStorage.getItem("activeCustomer"));
    let customerName;
    if (customer) {
      customerName = customer.fname + " " + customer.lname;
    }
    console.log(customer);

    return (
      <>
        <div className="create-order">
          <div className="row custom-row">
            <div className="col-md-7 ml-3">
              <Menu />
            </div>
            <div className="col-md-4 ml-5">
              <h2 className="text-center mu-title">Create New Order</h2>
              <div className="row col-md-12">
                <div className="col-md-6">
                  <button className="btn btn-normal btn-block mr-4 mt-4 mb-4" onClick={this.toggle1}>
                    Add New Customer
                  </button>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-normal btn-block ml-4 mt-4 mb-4" onClick={this.toggle2}>
                    Find Existing Customer
                  </button>
                </div>
              </div>
              <small className="d-block pb-3">* = required fields</small>
              <form action="add-experience.html">
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" name="customerName" value={customerName} required readOnly />
                  <small className="form-text text-muted">Customer Name *</small>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" value={this.state.orderDate.toISOString().substr(0, 10)} name="orderDate" required readOnly />
                  <small className="form-text text-muted">Order Date *</small>
                </div>
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
        <AddCustomerModal toggle={{ toggle: this.toggle1, modal: this.state.modal1, backdrop: this.state.backdrop }} />
        <FindCustomerModal toggle={{ toggle: this.toggle2, modal: this.state.modal2, backdrop: this.state.backdrop }} />
      </>
    );
  }
}

CreateOrder.propTpes = {
  order: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired,
  resetActiveCustomer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  order: state.order,
  errors: state.errors,
  customer: state.customer
});

export default connect(
  mapStateToProps,
  { resetActiveCustomer }
)(CreateOrder);
