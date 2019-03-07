import authReducer from "../../src/reducers/authReducer";
import { SET_CURRENT_USER } from "../../src/actions/types";
import expect from "expect";

const initialState = {
  isAuthenticated: false,
  user: {}
};

describe("auth reducer", () => {
  test("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle SET_CURRENT_USER", () => {
    expect(authReducer(initialState, { type: SET_CURRENT_USER, payload: { email: "test@test.com", exp: 123, fname: "test", iat: 12, id: "1" } })).toEqual({
      ...initialState,
      isAuthenticated: true,
      user: { email: "test@test.com", exp: 123, fname: "test", iat: 12, id: "1" }
    });
  });
});
