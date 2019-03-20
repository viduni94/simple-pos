import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import expect from "expect";
import * as customerActions from "../../src/actions/customerActions";
import { GET_ERRORS, SET_ACTIVE_CUSTOMER, RESET_ACTIVE_CUSTOMER, GET_CUSTOMERS } from "../../src/actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("customer actions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it("creates SET_ACTIVE_CUSTOMER after successfuly adding customer", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { fname: "Peter", lname: "David", mobile: "0771231234" }
      });
    });
    const expectedActions = [{ type: SET_ACTIVE_CUSTOMER, payload: { fname: "Peter", lname: "David", mobile: "0771231234" } }];

    const store = mockStore({ customer: {} });

    let customer = { fname: "Peter", lname: "David", mobile: "0771231234" };

    return store.dispatch(customerActions.addCustomer(customer)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates GET_ERRORS", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { email: "Invalid mobile number" }
      });
    });

    const expectedActions = [{ type: GET_ERRORS, payload: { email: "Invalid mobile number" } }];

    const store = mockStore({ customer: {} });

    let customer = { fname: "Peter", lname: "David", mobile: "123" };

    return store.dispatch(customerActions.addCustomer(customer)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("set RESET_ACTIVE_CUSTOMER", () => {
    const expectedActions = [{ type: RESET_ACTIVE_CUSTOMER }];

    const store = mockStore({ customer: {} });

    store.dispatch(customerActions.resetActiveCustomer());
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates GET_CUSTOMERS and returns all customers", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{ _id: "1", fname: "test", lname: "test", user: "2", mobile: "0771111111" }]
      });
    });
    const expectedActions = [{ type: GET_CUSTOMERS, payload: [{ _id: "1", fname: "test", lname: "test", user: "2", mobile: "0771111111" }] }];

    const store = mockStore({ customer: {} });

    return store.dispatch(customerActions.getAllCustomers()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates GET_ERRORS", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { error: "An error occurred" }
      });
    });

    const expectedActions = [{ type: GET_ERRORS, payload: { error: "An error occurred" } }];

    const store = mockStore({ customer: {} });

    return store.dispatch(customerActions.getAllCustomers()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
