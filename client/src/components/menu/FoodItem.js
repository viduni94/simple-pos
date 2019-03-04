import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class FoodItem extends Component {
  selectedItem = (itemId, itemName, itemPrice) => {
    let item = {
      foodItem: itemId,
      name: itemName,
      price: itemPrice,
      itemCount: 1
    };
    if (this.props.page.active === "newOrder") {
      this.props.callbackFromParent(item);
    } else if (this.props.page.active === "orderDetails") {
      this.props.callbackFromEditOrder(item);
    }
  };

  render() {
    let categoryType = this.props.category;

    return (
      <div className="col-md-6" key={categoryType._id}>
        <ul className="mu-menu-item-nav">
          <li>
            <div className="media">
              <div className="media-left">
                <img className="media-object" src={`../../img/menu/${categoryType.name}.jpg`} alt="img" />
              </div>
              <div className="media-body">
                <h4 className="media-heading">
                  <span>{categoryType.name}</span>
                </h4>
                <span className="mu-menu-price">{(categoryType.unitPrice / 100).toFixed(2)} LKR</span>
                <p>{categoryType.menu}</p>
                <p>
                  <button type="submit" className="btn btn-normal btn-sm" onClick={this.selectedItem.bind(this, categoryType._id, categoryType.name, categoryType.unitPrice)}>
                    Add Item
                  </button>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

FoodItem.propTypes = {
  item: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item,
  page: state.page
});

export default connect(mapStateToProps)(FoodItem);
