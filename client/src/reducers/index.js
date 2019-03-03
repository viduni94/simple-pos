import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import orderListReducer from "./orderListReducer";
import itemReducer from "./itemReducer";
import customerReducer from "./customerReducer";
import pageReducer from "./pageReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  orderList: orderListReducer,
  item: itemReducer,
  customer: customerReducer,
  page: pageReducer
});
