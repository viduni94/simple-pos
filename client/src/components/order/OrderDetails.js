import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/spinner";
import moment from "moment";
import { Link } from "react-router-dom";

import { setActiveOrder, getOpenOrderList } from "../../actions/orderListActions";
import { getFoodItems } from "../../actions/itemActions";
import { setActivePage } from "../../actions/pageActions";

import Menu from "../menu/Menu";

class OrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderId: this.props.match.params.id
    };
  }

  componentDidMount() {
    this.props.setActiveOrder(this.state.orderId);
    this.props.getOpenOrderList();
    this.props.getFoodItems();
    this.props.setActivePage("orderDetails");
  }

  render() {
    const { orderLists, activeOrder, loading } = this.props.orderList;

    let activeOrderContent;
    let activeOrderDetails;
    let activeOrderItems;
    let totalItemCount;
    let totalBillAmount;

    if (orderLists === null || loading) {
      activeOrderContent = (
        <div className="m-auto">
          <Spinner />
        </div>
      );
    } else {
      if (Object.keys(orderLists).length > 0) {
        activeOrderDetails = orderLists.filter(order => !order._id.localeCompare(activeOrder));
        if (activeOrderDetails.length > 0) {
          activeOrderItems = activeOrderDetails[0].orderItems.map((item, index) => (
            <tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>{item.foodItem.name}</td>
              <td className="text-center">{item.itemCount}</td>
              <td className="text-right pr-5">{(item.foodItem.unitPrice / 100).toFixed(2)}</td>
            </tr>
          ));

          totalItemCount = activeOrderDetails[0].orderItems.reduce((acc, currValue) => {
            return acc + currValue.itemCount;
          }, 0);

          totalBillAmount = activeOrderDetails[0].orderItems.reduce((acc, currValue) => {
            return acc + currValue.foodItem.unitPrice;
          }, 0);

          activeOrderContent = (
            <>
              <p className="lead text-center mb-4">
                Order Date - <b>{moment(activeOrderDetails[0].orderDate).format("Do MMM YYYY")}</b>
              </p>
              <form action="add-experience.html">
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" name="customerId" value={activeOrderDetails[0].customer.fname + " " + activeOrderDetails[0].customer.lname} required readOnly />
                  <small className="form-text text-muted">Customer Name</small>
                </div>
                <div className="form-group custom-table">
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item</th>
                        <th scope="col" className="text-center">
                          Quantity
                        </th>
                        <th scope="col" className=" text-center">
                          Price (LKR)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeOrderItems}
                      <tr>
                        <th scope="row">Total</th>
                        <td />
                        <td className="text-center">
                          <b>{totalItemCount}</b>
                        </td>
                        <td className="text-right pr-5">
                          <b>{(totalBillAmount / 100).toFixed(2)}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row col-md-12">
                  <div className="col-md-6">
                    <Link to={"/dashboard"} className="btn btn-secondary btn-block mr-4">
                      Cancel
                    </Link>
                  </div>
                  <div className="col-md-6">
                    <button type="submit" className="btn btn-normal btn-block ml-4">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </>
          );
        }
      }
    }

    return (
      <div>
        <div className="create-order">
          <div className="row custom-row">
            <div className="col-md-7 ml-3">
              <Menu />
            </div>
            <div className="col-md-4 ml-5">
              <h2 className="text-center mu-title">Details of Order No:</h2>
              <h5 className="text-center"> {activeOrder}</h5>
              {activeOrderContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OrderDetails.propTypes = {
  orderList: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  setActiveOrder: PropTypes.func.isRequired,
  getOpenOrderList: PropTypes.func.isRequired,
  getFoodItems: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orderList: state.orderList,
  item: state.item,
  page: state.page
});

export default connect(
  mapStateToProps,
  { setActiveOrder, getOpenOrderList, getFoodItems, setActivePage }
)(OrderDetails);
