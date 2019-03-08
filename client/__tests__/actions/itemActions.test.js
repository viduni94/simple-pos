import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import expect from "expect";
import * as itemsActions from "../../src/actions/itemActions";
import { GET_FOODITEMS, GET_ERRORS } from "../../src/actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("food item actions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it("creates GET_FOODITEMS and returns all food items", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{ _id: "1", name: "Mocha", category: "beverages" }]
      });
    });
    const expectedActions = [{ type: GET_FOODITEMS, payload: [{ _id: "1", name: "Mocha", category: "beverages" }] }];

    const store = mockStore({ foodItem: {} });

    return store.dispatch(itemsActions.getFoodItems()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates GET_ERRORS", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { name: "Name is required" }
      });
    });

    const expectedActions = [{ type: GET_ERRORS, payload: { name: "Name is required" } }];

    const store = mockStore({ foodItems: {} });

    return store.dispatch(itemsActions.getFoodItems()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
