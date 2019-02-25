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
        dashboardContent = <h4>TODO: DISPLAY ORDERLIST</h4>;
      } else {
        //User is logged in but no orders yet
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
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
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
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
