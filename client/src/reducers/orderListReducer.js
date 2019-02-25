import { GET_ORDERLIST, ORDERLIST_LOADING } from "../actions/types";

const initialState = {
  order: null,
  orderLists: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ORDERLIST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ORDERLIST:
      return {
        ...state,
        orderLists: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
