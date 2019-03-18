import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { checkoutOrder } from "../../actions/orderListActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

export class CheckoutConfirmModal extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const orderId = this.props.orderList.activeOrder;
    this.props.checkoutOrder(orderId);
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.toggle.modal} toggle={this.props.toggle.toggle} backdrop={this.props.toggle.backdrop}>
          <ModalHeader toggle={this.props.toggle.toggle}>Checkout Confirmation</ModalHeader>
          <form onSubmit={this.onSubmit}>
            <ModalBody>
              <p>Are you sure you want to checkout this order?</p>
            </ModalBody>
            <ModalFooter>
              <Button type="reset" onClose={this.toggleModalClose} color="secondary" onClick={this.props.toggle.toggle}>
                No
              </Button>
              <Button type="submit" color="danger" onClick={this.props.toggle.toggle}>
                Yes
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

CheckoutConfirmModal.propTypes = {
  orderList: PropTypes.object.isRequired,
  checkoutOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orderList: state.orderList
});

export default connect(
  mapStateToProps,
  { checkoutOrder }
)(withRouter(CheckoutConfirmModal));
