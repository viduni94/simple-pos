import axios from "axios";

import { GET_ORDERLIST, ORDERLIST_LOADING, GET_ERRORS } from "./types";

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
