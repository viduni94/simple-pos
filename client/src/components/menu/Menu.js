import React, { Component } from "react";
import { getFoodItems } from "../../actions/itemActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/spinner";
import FoodItem from "./FoodItem";

class Menu extends Component {
  componentDidMount() {
    this.props.getFoodItems();
  }

  render() {
    const { items } = this.props.item;

    let menucontent;

    if (items === undefined) {
      menucontent = <Spinner />;
    } else {
      const beverage = items.filter(item => !item.category.localeCompare("beverages")).map(bev => <FoodItem key={bev._id} category={bev} />);

      const appetizer = items.filter(item => !item.category.localeCompare("appetizers")).map(app => <FoodItem key={app._id} category={app} />);

      const main = items.filter(item => !item.category.localeCompare("mains")).map(main => <FoodItem key={main._id} category={main} />);

      const dessert = items.filter(item => !item.category.localeCompare("desserts")).map(des => <FoodItem key={des._id} category={des} />);

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
