import { GET_FOODITEMS } from "../actions/types";

const initialState = {
  item: null,
  items: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FOODITEMS:
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
