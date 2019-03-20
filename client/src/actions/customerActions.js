import { GET_ERRORS, SET_ACTIVE_CUSTOMER, RESET_ACTIVE_CUSTOMER, GET_CUSTOMERS } from "./types";
import axios from "axios";

// Add new customer
export const addCustomer = customerData => dispatch => {
  return axios
    .post("/customer", customerData)
    .then(res => {
      localStorage.setItem("activeCustomer", JSON.stringify(res.data));
      dispatch(setActiveCustomer(res.data));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
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

//Get order list for current user
export const getAllCustomers = () => dispatch => {
  return axios
    .get("/customers")
    .then(res =>
      dispatch({
        type: GET_CUSTOMERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
