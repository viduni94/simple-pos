import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
// import PropTypes from "prop-types";

class FindCustomerModal extends React.Component {
  render() {
    return (
      <div>
        <Modal isOpen={this.props.toggle.modal} toggle={this.props.toggle.toggle} backdrop={this.props.toggle.backdrop}>
          <ModalHeader toggle={this.props.toggle.toggle}>Find Customer</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggle.toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggle.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default connect(null)(FindCustomerModal);
