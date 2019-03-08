import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import expect from "expect";
import * as authActions from "../../src/actions/authActions";
import { SET_CURRENT_USER, GET_ERRORS } from "../../src/actions/types";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("auth actions", () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(function() {
    moxios.uninstall();
  });

  it("creates SET_CURRENT_USER after successfuly logging user in", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNjkwMmY1ZWIyZDZhMmM4Yjc5YzllOSIsImZuYW1lIjoiVmlkdW5pIiwiZW1haWwiOiJ2aWR1bmkudXNoYW5rYUBnbWFpbC5jb20iLCJpYXQiOjE1NTIwMzU1NjUsImV4cCI6MTU1MjEyMTk2NX0.vHnqVDYbcdpls5tvNlQVAkxLwRS1us81O0sYEqq6yqw"
        }
      });
    });
    const expectedActions = [{ type: SET_CURRENT_USER, payload: { id: "5c6902f5eb2d6a2c8b79c9e9", fname: "Viduni", email: "viduni.ushanka@gmail.com", exp: 1552121965, iat: 1552035565 } }];

    const store = mockStore({ auth: {} });

    let user = {
      email: "viduni.ushanka@gmail.com",
      password: "123"
    };

    return store.dispatch(authActions.loginUser(user)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("creates GET_ERRORS", () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { email: "Invalid Email" }
      });
    });

    const expectedActions = [{ type: GET_ERRORS, payload: { email: "Invalid Email" } }];

    const store = mockStore({});

    let user = {
      email: "test",
      password: "123"
    };

    return store.dispatch(authActions.loginUser(user)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("remove SET_CURRENT_USER after successfuly logging user out", () => {
    const expectedActions = [{ type: SET_CURRENT_USER, payload: {} }];

    const store = mockStore({ auth: {} });

    store.dispatch(authActions.logoutUser());
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});
