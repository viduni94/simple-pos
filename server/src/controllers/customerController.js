const Customer = require("../models/CustomerModel");
const validateCustomerInput = require("../validations/customerValidation");

exports.createCustomer = (req, res) => {
  const { errors, isValid } = validateCustomerInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Customer.findOne({ mobile: req.body.mobile })
    .then(customer => {
      if (customer) {
        errors.mobile = "Mobile number already registered!";
        return res.status(400).json(errors);
      } else {
        const newCustomer = new Customer({
          fname: req.body.fname,
          lname: req.body.lname,
          mobile: req.body.mobile,
          user: req.body.userId
        });

        newCustomer
          .save()
          .then(customer => res.json(customer))
          .catch(err => console.log(err));
      }
    })
};

exports.getCustomers = (req, res) => {
  Customer.find()
    .exec((err, customers) => {
      if (!err) {
        res.json(customers);
      } else {
        res.json(errors);
      }
    });
}
