import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/login/Login";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/login" component={Login} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
