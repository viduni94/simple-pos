import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import { Alert } from "reactstrap";

import { resetActiveCustomer } from "../../actions/customerActions";
import { setActivePage } from "../../actions/pageActions";

import Menu from "../menu/Menu";
import AddCustomerModal from "../modals/AddCustomerModal";
import FindCustomerModal from "../modals/FindCustomerModal";

export class CreateOrder extends Component {
  constructor(props) {
    super(props);

    let curr = new Date();
    curr.setDate(curr.getDate());

    this.state = {
      orderDate: curr,
      itemCount: "",
      status: "",
      userId: this.props.auth.user.id,
      customerId: "",
      customerName: "",
      orderItems: [],
      errors: {},
      modal1: false,
      modal2: false,
      backdrop: true,
      successMessage: false,
      errorMessage: false
    };
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  componentDidMount() {
    this.props.setActivePage("newOrder");
    this.setState({
      customerId: localStorage.getItem("activeCustomer") ? JSON.parse(localStorage.getItem("activeCustomer"))._id : "",
      customerName: localStorage.getItem("activeCustomer") ? JSON.parse(localStorage.getItem("activeCustomer")).fname + " " + JSON.parse(localStorage.getItem("activeCustomer")).lname : "",
      itemCount: this.state.orderItems.length
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      customerName: !localStorage.getItem("activeCustomer")
        ? this.props.customer.customer
          ? this.props.customer.customer.fname + " " + this.props.customer.customer.lname
          : ""
        : JSON.parse(localStorage.getItem("activeCustomer")).fname + " " + JSON.parse(localStorage.getItem("activeCustomer")).lname,
      customerId: !localStorage.getItem("activeCustomer") ? (this.props.customer.customer ? this.props.customer.customer._id : "") : JSON.parse(localStorage.getItem("activeCustomer"))._id
    });
  }

  componentWillUnmount() {
    this.props.resetActiveCustomer();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();

    const orderData = {
      orderDate: this.state.orderDate,
      itemCount: this.state.itemCount,
      userId: this.state.userId,
      customerId: this.state.customerId,
      orderItems: this.state.orderItems
    };
    axios
      .post("/order", orderData)
      .then(res => {
        this.setState({ successMessage: true, customerId: "", customerName: "", orderItems: [], itemCount: "", status: "" });
        localStorage.removeItem("activeCustomer");
        return res.data;
      })
      .catch(err => {
        this.setState({ errorMessage: true });
        return err;
      });

    setTimeout(
      function() {
        this.setState({ successMessage: false, errorMessage: false });
      }.bind(this),
      4000
    );
  }

  render() {
    // Get active customer details from persistent storage (local)

    // List for order items
    let orderItemsContent;
    let totalItemCount;
    let totalBillAmount;

    if (this.state.orderItems.length > 0) {
      orderItemsContent = this.state.orderItems.map((item, index) => (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{item.foodItem.name}</td>
          <td className="text-center">{item.itemCount}</td>
          <td className="text-right pr-5">{(item.foodItem.unitPrice / 100).toFixed(2)}</td>
        </tr>
      ));

      totalItemCount = this.state.orderItems.reduce((acc, currValue) => {
        return acc + currValue.itemCount;
      }, 0);

      totalBillAmount = this.state.orderItems.reduce((acc, currValue) => {
        return acc + currValue.foodItem.unitPrice;
      }, 0);
    }

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
              <form onSubmit={this.onSubmit}>
                <Alert isOpen={this.state.successMessage} color="success">
                  Order submitted succesfully!
                </Alert>
                <Alert isOpen={this.state.errorMessage} color="danger">
                  An error occurred while submitting order!
                </Alert>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" name="customerName" value={this.state.customerName} required readOnly />
                  <small className="form-text text-muted">Customer Name *</small>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" value={this.state.orderDate.toISOString().substr(0, 10)} name="orderDate" required readOnly />
                  <small className="form-text text-muted">Order Date *</small>
                </div>
                <div className="form-group custom-table-1">
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
                      {orderItemsContent}
                      <tr>
                        <th scope="row">{totalItemCount ? "Total" : null}</th>
                        <td />
                        <td className="text-center">
                          <b>{totalItemCount ? totalItemCount : null}</b>
                        </td>
                        <td className="text-right pr-5">
                          <b>{totalBillAmount ? (totalBillAmount / 100).toFixed(2) : null}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row col-md-12">
                  <div className="col-md-6">
                    <Link to="/dashboard" className="btn btn-secondary btn-block mr-4">
                      Cancel
                    </Link>
                  </div>
                  <div className="col-md-6">
                    <button type="submit" className="btn btn-normal btn-block ml-4">
                      Submit Order
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
  page: PropTypes.object.isRequired,
  resetActiveCustomer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  setActivePage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  order: state.order,
  errors: state.errors,
  customer: state.customer,
  auth: state.auth,
  page: state.page
});

export default connect(
  mapStateToProps,
  { resetActiveCustomer, setActivePage }
)(CreateOrder);
