import { SET_ACTIVE_CUSTOMER, RESET_ACTIVE_CUSTOMER } from "../actions/types";

const initialState = {
  customer: null,
  activeCustomer: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_CUSTOMER:
      return {
        ...state,
        activeCustomer: action.payload._id,
        customer: action.payload
      };
    case RESET_ACTIVE_CUSTOMER:
      return {
        ...state,
        activeCustomer: null,
        customer: null
      };
    default:
      return state;
  }
}
