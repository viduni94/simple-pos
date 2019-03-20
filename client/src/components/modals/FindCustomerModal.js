import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import { getAllCustomers, setActiveCustomer } from "../../actions/customerActions";
import { withRouter } from "react-router-dom";

class FindCustomerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mobile: "",
      errors: {},
      customerId: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.toggleModalClose = this.toggleModalClose.bind(this);
  }

  toggleModalClose = () => {
    this.setState({ mobile: "" });
  };

  onSubmit(e) {
    e.preventDefault();

    const activeCustomer = this.props.customer.customers.filter(cus => cus._id === this.state.customerId);
    localStorage.setItem("activeCustomer", JSON.stringify(activeCustomer[0]));
    this.props.setActiveCustomer(activeCustomer[0]);
  }

  componentDidMount() {
    this.props.getAllCustomers();
  }

  render() {
    const { customers } = this.props.customer;

    const mobileNumbers = []; 

    customers.map(customer => {
      const obj = {
        label: customer.mobile,
        value: customer._id
      };
      return mobileNumbers.push(obj);
    });

    return (
      <div>
        <Modal isOpen={this.props.toggle.modal} toggle={this.props.toggle.toggle} backdrop={this.props.toggle.backdrop}>
          <ModalHeader toggle={this.props.toggle.toggle}>Find Customer</ModalHeader>
          <form onSubmit={this.onSubmit}>
            <ModalBody>
              <div className="form-group">
                <Select name="mobile" options={mobileNumbers} onChange={opt => this.setState({ customerId: opt.value })} required />
                <small className="form-text text-muted">Select customer from mobile</small>
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
          </form>
        </Modal>
      </div>
    );
  }
}

FindCustomerModal.propTypes = {
  customer: PropTypes.object.isRequired,
  getAllCustomers: PropTypes.func.isRequired,
  setActiveCustomer: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  customer: state.customer
});

export default connect(
  mapStateToProps,
  { getAllCustomers, setActiveCustomer }
)(withRouter(FindCustomerModal));
