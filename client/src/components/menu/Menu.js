import React, { Component } from "react";

class Menu extends Component {
  render() {
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
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="beverages">
                      <div className="mu-tab-content-area">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mu-tab-content-left">
                              <ul className="mu-menu-item-nav">
                                <li>
                                  <div className="media">
                                    <div className="media-left">
                                      <a href=" ">
                                        <img className="media-object" src="assets/img/menu/item-1.jpg" alt="img" />
                                      </a>
                                    </div>
                                    <div className="media-body">
                                      <h4 className="media-heading">
                                        <a href=" ">English Breakfast</a>
                                      </h4>
                                      <span className="mu-menu-price">$15.85</span>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere nulla aliquid praesentium dolorem commodi illo.</p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="appetizers">
                      <div className="mu-tab-content-area">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mu-tab-content-left">
                              <ul className="mu-menu-item-nav">
                                <li>
                                  <div className="media">
                                    <div className="media-left">
                                      <a href=" ">
                                        <img className="media-object" src="assets/img/menu/item-1.jpg" alt="img" />
                                      </a>
                                    </div>
                                    <div className="media-body">
                                      <h4 className="media-heading">
                                        <a href=" ">English Breakfast</a>
                                      </h4>
                                      <span className="mu-menu-price">$15.85</span>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere nulla aliquid praesentium dolorem commodi illo.</p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="mains">
                      <div className="mu-tab-content-area">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mu-tab-content-left">
                              <ul className="mu-menu-item-nav">
                                <li>
                                  <div className="media">
                                    <div className="media-left">
                                      <a href=" ">
                                        <img className="media-object" src="assets/img/menu/item-1.jpg" alt="img" />
                                      </a>
                                    </div>
                                    <div className="media-body">
                                      <h4 className="media-heading">
                                        <a href=" ">English Breakfast</a>
                                      </h4>
                                      <span className="mu-menu-price">$15.85</span>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere nulla aliquid praesentium dolorem commodi illo.</p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="desserts">
                      <div className="mu-tab-content-area">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mu-tab-content-left">
                              <ul className="mu-menu-item-nav">
                                <li>
                                  <div className="media">
                                    <div className="media-left">
                                      <a href=" ">
                                        <img className="media-object" src="assets/img/menu/item-1.jpg" alt="img" />
                                      </a>
                                    </div>
                                    <div className="media-body">
                                      <h4 className="media-heading">
                                        <a href=" ">English Breakfast</a>
                                      </h4>
                                      <span className="mu-menu-price">$15.85</span>
                                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere nulla aliquid praesentium dolorem commodi illo.</p>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Menu;
