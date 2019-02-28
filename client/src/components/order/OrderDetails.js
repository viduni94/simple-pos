import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setActiveOrder } from "../../actions/orderListActions";

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
  }

  render() {
    const { orderLists, loading } = this.props.orderList;

    return (
      <div>
        <div className="create-order">
          <div className="row custom-row">
            <div className="col-md-7 ml-3">
              <Menu />
            </div>
            <div className="col-md-4 ml-5">
              <h2 className="text-center mu-title">Details of Order No:</h2>
              <h5 className="text-center"> {this.state.orderId}</h5>
              <p className="lead text-center mb-4">Order Date - </p>
              <form action="add-experience.html">
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" name="customerId" onChange={this.onChange} required readOnly />
                  <small className="form-text text-muted">Customer Name</small>
                </div>
                <div className="form-group custom-table">
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
                  <div className="col-md-3">
                    <button className="btn btn-normal btn-block">Add Item</button>
                  </div>
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
      </div>
    );
  }
}

OrderDetails.propTypes = {
  orderList: PropTypes.object.isRequired,
  setActiveOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orderList: state.orderList
});

export default connect(
  mapStateToProps,
  { setActiveOrder }
)(OrderDetails);
