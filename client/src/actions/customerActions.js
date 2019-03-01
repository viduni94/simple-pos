import { GET_ERRORS, SET_ACTIVE_CUSTOMER, RESET_ACTIVE_CUSTOMER } from "./types";
import axios from "axios";

// Add new customer
export const addCustomer = customerData => dispatch => {
  axios
    .post("/customer", customerData)
    .then(res => {
      localStorage.setItem("activeCustomer", JSON.stringify(res.data));
      dispatch(setActiveCustomer(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const setActiveCustomer = customer => {
  return {
    type: SET_ACTIVE_CUSTOMER,
    payload: customer
  };
};

export const resetActiveCustomer = () => dispatch => {
  dispatch({
    type: RESET_ACTIVE_CUSTOMER
  });
  localStorage.removeItem("activeCustomer");
};
