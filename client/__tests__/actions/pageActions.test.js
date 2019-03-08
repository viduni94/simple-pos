import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import expect from "expect";
import * as pageActions from "../../src/actions/pageActions";
import { SET_ACTIVE_PAGE } from "../../src/actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("page actions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it("set SET_ACTIVE_PAGE", () => {
    const expectedActions = [{ type: SET_ACTIVE_PAGE, payload: "newOrder" }];

    const store = mockStore({ page: {} });

    store.dispatch(pageActions.setActivePage("newOrder"));
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});
