import axios from "axios";
import history from "../utils/history";

import { GET_ORDERLIST, ORDERLIST_LOADING, GET_ERRORS, SET_ACTIVE_ORDER, RESET_ACTIVE_ORDER, ADD_ITEM_TO_ORDER, DELETE_ITEM_FROM_ORDER, CHECKOUT_ORDER } from "./types";

//Get order list for current user
export const getOpenOrderList = () => dispatch => {
  dispatch(setOrderListLoading());

  axios
    .get("/order")
    .then(res =>
      dispatch({
        type: GET_ORDERLIST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

// Order list loading
export const setOrderListLoading = () => {
  return {
    type: ORDERLIST_LOADING
  };
};

// Set active order
export const setActiveOrder = id => dispatch => {
  dispatch({
    type: SET_ACTIVE_ORDER,
    payload: id
  });
};

export const resetActiveOrder = () => dispatch => {
  dispatch({
    type: RESET_ACTIVE_ORDER
  });
};

export const addItemToOrder = order => dispatch => {
  axios
    .post("/order/orderItem", order)
    .then(res => {
      dispatch({
        type: ADD_ITEM_TO_ORDER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const deleteItemFromOrder = (orderId, itemId) => dispatch => {
  axios
    .delete(`/order/orderItem/${orderId}/${itemId}`)
    .then(res => {
      dispatch({
        type: DELETE_ITEM_FROM_ORDER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

export const checkoutOrder = orderId => dispatch => {
  axios
    .put(`/order/${orderId}`)
    .then(res => {
      dispatch({
        type: CHECKOUT_ORDER,
        payload: res.data
      });
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};
