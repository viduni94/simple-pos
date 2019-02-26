import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOpenOrderList } from "../../actions/orderListActions";
import Spinner from "../common/spinner";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserOrders: []
    };
  }
  componentDidMount() {
    this.props.getOpenOrderList();
  }

  render() {
    const { user } = this.props.auth;
    const { orderLists, loading } = this.props.orderList;

    let dashboardContent;

    if (orderLists === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(orderLists).length > 0) {
        orderLists.forEach(order => {
          if (!order.userId.localeCompare(user.id)) {
            this.state.currentUserOrders.push(order);
          }
        });

        dashboardContent = this.state.currentUserOrders.map(order => (
          <div className="col-md-3 m-auto" key={order._id} style={{ width: 250, height: 200 }}>
            <div className="card mt-2">
              <div className="card-header">
                Customer: {order.customer.fname} {order.customer.lname}
              </div>
              <div className="card-body">
                <p className="card-text">Order Number: {order._id}</p>
                <p className="card-text">Total amount: --</p>
              </div>
              <div className="card-footer text-center">
                <a href=" " className="card-link">
                  View Order Details
                </a>
              </div>
            </div>
          </div>
        ));
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
    console.log(this.state.currentUserOrders);

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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  orderList: state.orderList,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getOpenOrderList }
)(Dashboard);
