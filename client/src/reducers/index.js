import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import orderListReducer from "./orderListReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  orderList: orderListReducer
});
