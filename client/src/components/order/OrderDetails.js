import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/spinner";
import moment from "moment";
import { Link } from "react-router-dom";

import { setActiveOrder, getOpenOrderList, addItemToOrder, deleteItemFromOrder } from "../../actions/orderListActions";
import { getFoodItems } from "../../actions/itemActions";
import { setActivePage } from "../../actions/pageActions";

import Menu from "../menu/Menu";
import CheckoutConfirmModal from "../modals/CheckoutConfirmModal";

class OrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderId: this.props.match.params.id,
      modal: false,
      backdrop: true
    };

    this.getOrderItems = this.getOrderItems.bind(this);
    this.newOrderItemObj = {};

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  componentDidMount() {
    this.props.setActiveOrder(this.state.orderId);
    this.props.getOpenOrderList();
    this.props.getFoodItems();
    this.props.setActivePage("orderDetails");
  }

  getOrderItems = item => {
    let orderDetails = this.props.orderList.orderLists.filter(order => !order._id.localeCompare(this.props.orderList.activeOrder));

    if (item) {
      this.newOrderItemObj = {
        foodItem: item.foodItem,
        itemCount: item.itemCount,
        orderId: orderDetails[0]._id
      };

      this.props.addItemToOrder(this.newOrderItemObj);
    }
  };

  removeOneItem(orderId, itemId) {
    this.props.deleteItemFromOrder(orderId, itemId);
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
          activeOrderItems = activeOrderDetails[0].orderItems.map((item, index) => {
            return (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.foodItem.name}</td>
                <td className="text-center">{item.itemCount}</td>
                <td className="text-right pr-5">{((item.foodItem.unitPrice * item.itemCount) / 100).toFixed(2)}</td>
                <td className="text-center">
                  <button type="button" className="btn btn-danger btn-sm" onClick={this.removeOneItem.bind(this, activeOrderDetails[0]._id, item._id)}>
                    <i className="fa fa-minus" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            );
          });

          totalItemCount = activeOrderDetails[0].orderItems.reduce((acc, currValue) => {
            return acc + currValue.itemCount;
          }, 0);

          totalBillAmount = activeOrderDetails[0].orderItems.reduce((acc, currValue) => {
            return acc + currValue.foodItem.unitPrice * currValue.itemCount;
          }, 0);

          activeOrderContent = (
            <>
              <p className="lead text-center mb-4">
                Order Date - <b>{moment(activeOrderDetails[0].orderDate).format("Do MMM YYYY")}</b>
              </p>

              <div className="form-group">
                <input type="text" className="form-control form-control-lg" name="customerId" value={activeOrderDetails[0].customer.fname + " " + activeOrderDetails[0].customer.lname} required readOnly />
                <small className="form-text text-muted">Customer Name</small>
              </div>
              <div className="form-group custom-table">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th className="text-center">
                        Quantity
                      </th>
                      <th className=" text-center">
                        Price (LKR)
                      </th>
                      <th className=" text-center">
                        Action
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
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-6 col-xs-6">
                  <Link to={"/dashboard"} className="btn btn-secondary btn-block">
                    Go Back
                  </Link>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-normal btn-block" onClick={this.toggle}>
                    Checkout
                  </button>
                </div>
              </div>

              <CheckoutConfirmModal toggle={{ toggle: this.toggle, modal: this.state.modal, backdrop: this.state.backdrop }} />
            </>
          );
        }
      }
    }

    return (
      <>
        <div>
          <div className="create-order">
            <div className="row custom-row">
              <div className="col-md-7 col-sm-12 col-xs-12 ml-3">
                <Menu callbackFromParent={this.getOrderItems} />
              </div>
              <div className="col-md-4 col-sm-12 ml-2">
                <h2 className="text-center mu-title">Details of Order No:</h2>
                <h5 className="text-center"> {activeOrder}</h5>
                {activeOrderContent}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

OrderDetails.propTypes = {
  orderList: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  setActiveOrder: PropTypes.func.isRequired,
  getOpenOrderList: PropTypes.func.isRequired,
  getFoodItems: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  addItemToOrder: PropTypes.func.isRequired,
  deleteItemFromOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orderList: state.orderList,
  item: state.item,
  page: state.page
});

export default connect(
  mapStateToProps,
  { setActiveOrder, getOpenOrderList, getFoodItems, setActivePage, addItemToOrder, deleteItemFromOrder }
)(OrderDetails);
