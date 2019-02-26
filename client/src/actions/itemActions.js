import axios from "axios";

import { GET_FOODITEMS, GET_ERRORS } from "./types";

//Get the list of food items
export const getFoodItems = () => dispatch => {
  axios
    .get("/foodItem")
    .then(res =>
      dispatch({
        type: GET_FOODITEMS,
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
