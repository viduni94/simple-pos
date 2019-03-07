import pageReducer from "../../src/reducers/pageReducer";
import { SET_ACTIVE_PAGE } from "../../src/actions/types";
import expect from "expect";

const initialState = {
  active: null
};

describe("page reducer", () => {
  test("should return the initial state", () => {
    expect(pageReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle SET_ACTIVE_PAGE", () => {
    expect(pageReducer(initialState, { type: SET_ACTIVE_PAGE, payload: "newOrder" })).toEqual({
      ...initialState,
      active: "newOrder"
    });
  });
});
