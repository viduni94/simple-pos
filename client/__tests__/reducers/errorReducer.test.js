import errorReducer from "../../src/reducers/errorReducer";
import { GET_ERRORS } from "../../src/actions/types";
import expect from "expect";

const initialState = {};

describe("error reducer", () => {
  test("should return the initial state", () => {
    expect(errorReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle GET_ERRORS", () => {
    expect(errorReducer(initialState, { type: GET_ERRORS, payload: { name: "Required" } })).toEqual({ name: "Required" });
  });
});
