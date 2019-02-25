import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getOpenOrderList } from "../../actions/orderListActions";
import Spinner from "../common/spinner";
import { Link } from "react-router-dom";

class Dashboard extends Component {
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
        dashboardContent = (
          <div className="row">
            <div className="col-md-3 m-auto">
              <div className="card mt-2" style={{ width: 250 }}>
                <div className="card-header">Customer: ABC</div>
                <div className="card-body">
                  <p className="card-text">Order Number: #001</p>
                  <p className="card-text">Total amount: 5,000 LKR</p>
                </div>
                <div className="card-footer text-center">
                  <a href=" " className="card-link">
                    View Order Details
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 m-auto">
              <div className="card mt-2" style={{ width: 250 }}>
                <div className="card-header">Customer: ABC</div>
                <div className="card-body">
                  <p className="card-text">Order Number: #001</p>
                  <p className="card-text">Total amount: 5,000 LKR</p>
                </div>
                <div className="card-footer text-center">
                  <a href=" " className="card-link">
                    View Order Details
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 m-auto">
              <div className="card mt-2" style={{ width: 250 }}>
                <div className="card-header">Customer: ABC</div>
                <div className="card-body">
                  <p className="card-text">Order Number: #001</p>
                  <p className="card-text">Total amount: 5,000 LKR</p>
                </div>
                <div className="card-footer text-center">
                  <a href=" " className="card-link">
                    View Order Details
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3 m-auto">
              <div className="card mt-2" style={{ width: 250 }}>
                <div className="card-header">Customer: ABC</div>
                <div className="card-body">
                  <p className="card-text">Order Number: #001</p>
                  <p className="card-text">Total amount: 5,000 LKR</p>
                </div>
                <div className="card-footer text-center">
                  <a href=" " className="card-link">
                    View Order Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        //User is logged in but no orders yet
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.fname}</p>
            <p>You don't have any open orders yet</p>
            <Link to="/order" className="btn btn-lg btn-info">
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
