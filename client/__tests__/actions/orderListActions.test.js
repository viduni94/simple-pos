import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import expect from "expect";
import * as orderListActions from "../../src/actions/orderListActions";
import { GET_ORDERLIST, ORDERLIST_LOADING, GET_ERRORS, SET_ACTIVE_ORDER, RESET_ACTIVE_ORDER, ADD_ITEM_TO_ORDER, DELETE_ITEM_FROM_ORDER, CHECKOUT_ORDER } from "../../src/actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("order list actions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it("creates GET_ORDERLIST and return all open orders", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{ _id: "1", orderDate: "2019-03-03", customer: "1", user: "2", orderItems: [{ foodItem: "1", itemCount: 1 }] }]
      });
    });
    const expectedActions = [{ type: ORDERLIST_LOADING }, { type: GET_ORDERLIST, payload: [{ _id: "1", orderDate: "2019-03-03", customer: "1", user: "2", orderItems: [{ foodItem: "1", itemCount: 1 }] }] }];

    const store = mockStore({ orderList: {} });

    return store.dispatch(orderListActions.getOpenOrderList()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates GET_ERRORS", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { customer: "Customer is required" }
      });
    });

    const expectedActions = [{ type: ORDERLIST_LOADING }, { type: GET_ERRORS, payload: { customer: "Customer is required" } }];

    const store = mockStore({ orderList: {} });

    return store.dispatch(orderListActions.getOpenOrderList()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("set SET_ACTIVE_ORDER", () => {
    const expectedActions = [{ type: SET_ACTIVE_ORDER, payload: "1" }];

    const store = mockStore({ orderList: {} });

    store.dispatch(orderListActions.setActiveOrder("1"));
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("set RESET_ACTIVE_ORDER", () => {
    const expectedActions = [{ type: RESET_ACTIVE_ORDER }];

    const store = mockStore({ orderList: {} });

    store.dispatch(orderListActions.resetActiveOrder());
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("creates ADD_ITEM_TO_ORDER and return all open orders", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{ _id: "1", orderDate: "2019-03-03", customer: "1", user: "2", orderItems: [{ foodItem: "1", itemCount: 1 }] }]
      });
    });
    const expectedActions = [{ type: ADD_ITEM_TO_ORDER, payload: [{ _id: "1", orderDate: "2019-03-03", customer: "1", user: "2", orderItems: [{ foodItem: "1", itemCount: 1 }] }] }];

    const store = mockStore({ orderList: {} });

    return store.dispatch(orderListActions.addItemToOrder()).then(() => {
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

    const store = mockStore({ orderList: {} });

    return store.dispatch(orderListActions.addItemToOrder()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates DELETE_ITEM_FROM_ORDER and return all open orders", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{ _id: "1", orderDate: "2019-03-03", customer: "1", user: "2", orderItems: [{ foodItem: "1", itemCount: 1 }] }]
      });
    });
    const expectedActions = [{ type: DELETE_ITEM_FROM_ORDER, payload: [{ _id: "1", orderDate: "2019-03-03", customer: "1", user: "2", orderItems: [{ foodItem: "1", itemCount: 1 }] }] }];

    const store = mockStore({ orderList: {} });

    return store.dispatch(orderListActions.deleteItemFromOrder()).then(() => {
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

    const store = mockStore({ orderList: {} });

    return store.dispatch(orderListActions.deleteItemFromOrder()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates CHECKOUT_ORDER and return all open orders", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{ _id: "1", orderDate: "2019-03-03", customer: "1", user: "2", orderItems: [{ foodItem: "1", itemCount: 1 }] }]
      });
    });
    const expectedActions = [{ type: CHECKOUT_ORDER, payload: [{ _id: "1", orderDate: "2019-03-03", customer: "1", user: "2", orderItems: [{ foodItem: "1", itemCount: 1 }] }] }];

    const store = mockStore({ orderList: {} });

    return store.dispatch(orderListActions.checkoutOrder("1")).then(() => {
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

    const store = mockStore({ orderList: {} });

    return store.dispatch(orderListActions.checkoutOrder("1")).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
