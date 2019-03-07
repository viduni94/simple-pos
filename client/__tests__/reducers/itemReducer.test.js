import itemReducer from "../../src/reducers/itemReducer";
import { GET_FOODITEMS } from "../../src/actions/types";
import expect from "expect";

const initialState = {
    item: null,
    items: []
  };

describe("items reducer", () => {
  test("should return the initial state", () => {
    expect(itemReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle GET_FOODITEMS", () => {
    expect(itemReducer(initialState, { type: GET_FOODITEMS, payload: [{ _id:"1", name: "mocha", unitPrice:"500", category:"beverages"}] })).toEqual({
      ...initialState,
      items: [{ _id:"1", name: "mocha", unitPrice:"500", category:"beverages"}]
    });
  });
});
