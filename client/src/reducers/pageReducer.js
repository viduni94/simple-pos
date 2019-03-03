import { SET_ACTIVE_PAGE } from "../actions/types";

const initialState = {
  active: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_PAGE:
      return {
        ...state,
        active: action.payload
      };
    default:
      return state;
  }
}
