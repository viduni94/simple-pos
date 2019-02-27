import React, { Component } from "react";
import { getFoodItems } from "../../actions/itemActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/spinner";

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getFoodItems();
  }

  render() {
    const { items } = this.props.item;

    let menucontent;

    if (items === undefined) {
      menucontent = <Spinner />;
    } else {
      console.log(items.category);

      const beverage = items
        .filter(item => !item.category.localeCompare("beverages"))
        .map(bev => (
          <div className="col-md-6" key={bev._id}>
            <ul className="mu-menu-item-nav">
              <li>
                <div className="media">
                  <div className="media-left">
                    <img className="media-object" src={`../../img/menu/${bev.name}.jpg`} alt="img" />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">
                      <span>{bev.name}</span>
                    </h4>
                    <span className="mu-menu-price">{(bev.unitPrice / 100).toFixed(2)} LKR</span>
                    <p>{bev.menu}</p>
                    <p>
                      <button className="btn btn-normal btn-sm">Add Item</button>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ));

      const appetizer = items
        .filter(item => !item.category.localeCompare("appetizers"))
        .map(app => (
          <div className="col-md-6" key={app._id}>
            <ul className="mu-menu-item-nav">
              <li>
                <div className="media">
                  <div className="media-left">
                    <img className="media-object" src={`../../img/menu/${app.name}.jpg`} alt="img" />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">
                      <span>{app.name}</span>
                    </h4>
                    <span className="mu-menu-price">{(app.unitPrice / 100).toFixed(2)} LKR</span>
                    <p>{app.menu}</p>
                    <p>
                      <button className="btn btn-normal btn-sm">Add Item</button>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ));

      const main = items
        .filter(item => !item.category.localeCompare("mains"))
        .map(main => (
          <div className="col-md-6" key={main._id}>
            <ul className="mu-menu-item-nav">
              <li>
                <div className="media">
                  <div className="media-left">
                    <img className="media-object" src={`../../img/menu/${main.name}.jpg`} alt="img" />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">
                      <span>{main.name}</span>
                    </h4>
                    <span className="mu-menu-price">{(main.unitPrice / 100).toFixed(2)} LKR</span>
                    <p>{main.menu}</p>
                    <p>
                      <button className="btn btn-normal btn-sm">Add Item</button>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ));

      const dessert = items
        .filter(item => !item.category.localeCompare("desserts"))
        .map(des => (
          <div className="col-md-6" key={des._id}>
            <ul className="mu-menu-item-nav">
              <li>
                <div className="media">
                  <div className="media-left">
                    <img className="media-object" src={`../../img/menu/${des.name}.jpg`} alt="img" />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">
                      <span>{des.name}</span>
                    </h4>
                    <span className="mu-menu-price">{(des.unitPrice / 100).toFixed(2)} LKR</span>
                    <p>{des.menu}</p>
                    <p>
                      <button className="btn btn-normal btn-sm">Add Item</button>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ));

      menucontent = (
        <div className="tab-content">
          <div className="tab-pane fade show active" id="beverages">
            <div className="mu-tab-content-area">
              <div className="row col-md-12">{beverage}</div>
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
