import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCustomer } from "../../actions/customerActions";
import classnames from "classnames";

class AddCustomerModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: "",
      mobile: "",
      userId: this.props.auth.user.id,
      error: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  toggleModalClose = () => {
    this.setState({ fname: "", lname: "", mobile: "" });
  };

  onSubmit(e) {
    e.preventDefault();

    const customerData = {
      fname: this.state.fname,
      lname: this.state.lname,
      mobile: this.state.mobile,
      userId: this.state.userId
    };
    this.props.addCustomer(customerData);
    this.setState({ fname: "", lname: "", mobile: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <Modal isOpen={this.props.toggle.modal} toggle={this.props.toggle.toggle} backdrop={this.props.toggle.backdrop}>
          <ModalHeader toggle={this.props.toggle.toggle}>Add New Customer</ModalHeader>
          <form onSubmit={this.onSubmit}>
            <ModalBody>
              <div className="form-group">
                <input type="text" className={classnames("form-control form-control-lg")} name="fname" value={this.state.fname} onChange={this.onChange} required />
                <small className="form-text text-muted">First Name *</small>
                {/* {errors.fname && <div className="invalid-feedback">{errors.fname}</div>} */}
              </div>
              <div className="form-group">
                <input type="text" className="form-control form-control-lg" name="lname" value={this.state.lname} onChange={this.onChange} />
                <small className="form-text text-muted">Last Name</small>
              </div>
              <div className="form-group">
                <input type="text" className={classnames("form-control form-control-lg")} name="mobile" value={this.state.mobile} onChange={this.onChange} required />
                <small className="form-text text-muted">Mobile Number *</small>
                {/* {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>} */}
              </div>
              <div className="form-group">
                <input type="hidden" className={classnames("form-control form-control-lg")} name="userId" value={user.id} required />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button type="reset" onClose={this.toggleModalClose} color="secondary" onClick={this.props.toggle.toggle}>
                Cancel
              </Button>
              <Button type="submit" color="success" onClick={this.props.toggle.toggle}>
                Save
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
}

AddCustomerModal.propTpes = {
  addCustomer: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  customer: state.customer,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addCustomer }
)(AddCustomerModal);
