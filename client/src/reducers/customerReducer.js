import { SET_ACTIVE_CUSTOMER, RESET_ACTIVE_CUSTOMER, GET_CUSTOMERS } from "../actions/types";

const initialState = {
  customer: null,
  activeCustomer: null,
  customers: []
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
      case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      };
    default:
      return state;
  }
}
