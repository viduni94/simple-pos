import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";

class FindCustomerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
  }

  toggleModalClose = () => {
    this.setState({ mobile: "" });
  };

  onSubmit(e) {
    e.preventDefault();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.toggle.modal} toggle={this.props.toggle.toggle} backdrop={this.props.toggle.backdrop}>
          <ModalHeader toggle={this.props.toggle.toggle}>Find Customer</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <input type="text" className={classnames("form-control form-control-lg")} name="mobile" value={this.state.mobile} onChange={this.onChange} required />
              <small className="form-text text-muted">Select customer from mobile</small>
              {/* {errors.fname && <div className="invalid-feedback">{errors.fname}</div>} */}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="reset" onClose={this.toggleModalClose} color="secondary" onClick={this.props.toggle.toggle}>
              Cancel
            </Button>
            <Button type="submit" color="success" onClick={this.props.toggle.toggle}>
              Select Customer
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(null)(FindCustomerModal);
