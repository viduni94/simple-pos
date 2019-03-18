import React, { Component } from "react";
import { getFoodItems } from "../../actions/itemActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/spinner";
import FoodItem from "./FoodItem";

export class Menu extends Component {
  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.addItemToNewList = this.addItemToNewList.bind(this);
  }

  componentDidMount() {
    this.props.getFoodItems();
  }

  addItemToNewList = item => {
    this.props.callbackFromParent(item);
  };

  addItem = dataFromFoodItem => {
    this.addItemToNewList(dataFromFoodItem);
  };

  render() {
    const { items } = this.props.item;

    let menucontent;

    if (items === undefined) {
      menucontent = <Spinner />;
    } else {
      const beverage = items.filter(item => !item.category.localeCompare("beverages")).map(bev => <FoodItem key={bev._id} category={bev} callbackFromParent={this.addItem} />);

      const appetizer = items.filter(item => !item.category.localeCompare("appetizers")).map(app => <FoodItem key={app._id} category={app} callbackFromParent={this.addItem} />);

      const main = items.filter(item => !item.category.localeCompare("mains")).map(main => <FoodItem key={main._id} category={main} callbackFromParent={this.addItem} />);

      const dessert = items.filter(item => !item.category.localeCompare("desserts")).map(des => <FoodItem key={des._id} category={des} callbackFromParent={this.addItem} />);

      menucontent = (
        <div className="tab-content">
          <div className="tab-pane fade show active" id="beverages">
            <div className="mu-tab-content-area">
              <div className="row">{beverage}</div>
            </div>
          </div>

          <div className="tab-pane fade" id="appetizers">
            <div className="mu-tab-content-area">
              <div className="row col-md-12">{appetizer}</div>
            </div>
          </div>

          <div className="tab-pane fade" id="mains">
            <div className="mu-tab-content-area">
              <div className="row col-md-12">{main}</div>
            </div>
          </div>

          <div className="tab-pane fade" id="desserts">
            <div className="mu-tab-content-area">
              <div className="row col-md-12">{dessert}</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <section id="mu-restaurant-menu">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mu-restaurant-menu-area">
                <div className="mu-restaurant-menu-content">
                  <ul className="nav nav-tabs mu-restaurant-menu">
                    <li>
                      <a className="nav-item nav-link active" href="#beverages" data-toggle="tab">
                        Beverages
                      </a>
                    </li>
                    <li>
                      <a className="nav-item nav-link" href="#appetizers" data-toggle="tab">
                        Appetizers
                      </a>
                    </li>
                    <li>
                      <a className="nav-item nav-link" href="#mains" data-toggle="tab">
                        Mains
                      </a>
                    </li>
                    <li>
                      <a className="nav-item nav-link" href="#desserts" data-toggle="tab">
                        Desserts
                      </a>
                    </li>
                  </ul>
                  {/* Tab panes */}
                  {menucontent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Menu.propTypes = {
  item: PropTypes.object.isRequired,
  getFoodItems: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { getFoodItems }
)(Menu);
