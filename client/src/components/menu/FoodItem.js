import React, { Component } from "react";

class FoodItem extends Component {
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
                  <button className="btn btn-normal btn-sm">Add Item</button>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

export default FoodItem;
