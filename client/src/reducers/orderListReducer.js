import { GET_ORDERLIST, ORDERLIST_LOADING, SET_ACTIVE_ORDER, RESET_ACTIVE_ORDER, ADD_ITEM_TO_ORDER, DELETE_ITEM_FROM_ORDER, CHECKOUT_ORDER } from "../actions/types";

const initialState = {
  orderLists: null,
  activeOrder: null,
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
    case SET_ACTIVE_ORDER:
      return {
        ...state,
        activeOrder: action.payload
      };
    case RESET_ACTIVE_ORDER:
      return {
        ...state,
        activeOrder: null
      };
    case ADD_ITEM_TO_ORDER:
      return {
        ...state,
        orderLists: state.orderLists.map(orderList => {
          if (orderList._id === action.payload._id) {
            return action.payload;
          }
          return orderList;
        })
      };
    case DELETE_ITEM_FROM_ORDER:
      return {
        ...state,
        orderLists: state.orderLists.map(orderList => {
          if (orderList._id === action.payload._id) {
            return action.payload;
          }
          return orderList;
        })
      };
    case CHECKOUT_ORDER:
      return {
        ...state,
        orderLists: state.orderLists.map(orderList => {
          if (orderList._id === action.payload._id) {
            return action.payload;
          }
          return orderList;
        })
      };
    default:
      return state;
  }
}
