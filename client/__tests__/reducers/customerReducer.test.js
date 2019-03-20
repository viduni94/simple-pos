import customerReducer from "../../src/reducers/customerReducer";
import { SET_ACTIVE_CUSTOMER, RESET_ACTIVE_CUSTOMER, GET_CUSTOMERS } from "../../src/actions/types";
import expect from "expect";

const initialState = {
  customer: null,
  activeCustomer: null,
  customers: []
};

describe("customer reducer", () => {
  test("should return the initial state", () => {
    expect(customerReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle SET_ACTIVE_CUSTOMER", () => {
    expect(customerReducer(initialState, { type: SET_ACTIVE_CUSTOMER, payload: { _id: "1", fname: "test", lname: "test", mobile: "0117711771" } })).toEqual({
      ...initialState,
      activeCustomer: "1",
      customer: { _id: "1", fname: "test", lname: "test", mobile: "0117711771" }
    });
  });

  test("should handle RESET_ACTIVE_CUSTOMER", () => {
    expect(
      customerReducer(
        {
          ...initialState,
          activeCustomer: "1",
          customer: { _id: "1", fname: "test", lname: "test", mobile: "0117711771" }
        },
        { type: RESET_ACTIVE_CUSTOMER }
      )
    ).toEqual({
      ...initialState,
      activeCustomer: null,
      customer: null
    });
  });

  test("should handle GET_CUSTOMERS", () => {
    expect(customerReducer(initialState, { type: GET_CUSTOMERS, payload: [{ _id: "1", fname: "test", lname: "test", user: "2", mobile: "0771111111" }] })).toEqual({
      ...initialState,
      customers: [{ _id: "1", fname: "test", lname: "test", user: "2", mobile: "0771111111" }]
    });
  });
});
