import { SET_ACTIVE_PAGE } from "./types";

//Get the list of food items
export const setActivePage = page => dispatch => {
  dispatch({
    type: SET_ACTIVE_PAGE,
    payload: page
  });
};
