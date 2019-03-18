import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/spinner";
import { Link } from "react-router-dom";

import { getOpenOrderList, resetActiveOrder } from "../../actions/orderListActions";
import { setActivePage } from "../../actions/pageActions";

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getOpenOrderList();
    this.props.resetActiveOrder();
    this.props.setActivePage("dashboard");
  }

  getTotalBillAmount = id => {
    if (this.props.orderList.orderLists.length > 0) {
      let singleOrder = this.props.orderList.orderLists.filter(order => {
        return !order._id.localeCompare(id);
      });
      if (singleOrder.length > 0) {
        return singleOrder[0].orderItems.reduce((acc, currValue) => {
          return acc + currValue.foodItem.unitPrice * currValue.itemCount;
        }, 0);
      }
    }
  };

  render() {
    const { user } = this.props.auth;
    const { orderLists, loading } = this.props.orderList;

    let dashboardContent;

    if (orderLists === null || loading) {
      dashboardContent = (
        <div className="m-auto">
          <Spinner />
        </div>
      );
    } else {
      if (Object.keys(orderLists).length > 0) {
        dashboardContent = orderLists
          .filter(order => !order.user.localeCompare(user.id))
          .map(order => {
            return (
              <div className="col-md-3 m-auto" key={order._id} style={{ width: 300, height: 270 }}>
                <div className="card mt-2">
                  <div className="card-header">
                    Customer: {order.customer.fname} {order.customer.lname}
                  </div>
                  <div className="card-body">
                    <p className="card-text">Order Number: {order._id}</p>
                    <p className="card-text">
                      Total amount:<b> {(this.getTotalBillAmount(order._id) / 100).toFixed(2)}</b>
                    </p>
                  </div>
                  <div className="card-footer text-center">
                    <Link to={"/order-details/" + order._id} className="card-link">
                      View Order Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          });
      } else {
        //User is logged in but no orders yet
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.fname}</p>
            <p>You don't have any open orders yet</p>
            <Link to="/create-order" className="btn btn-lg btn-info">
              Create Order
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <h3 className="custom-title">- Open Orders of {user.fname} -</h3>
              </div>
              <div className="row">{dashboardContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  orderList: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  getOpenOrderList: PropTypes.func.isRequired,
  resetActiveOrder: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orderList: state.orderList,
  auth: state.auth,
  page: state.page
});

export default connect(
  mapStateToProps,
  { getOpenOrderList, resetActiveOrder, setActivePage }
)(Dashboard);
