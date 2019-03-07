import orderListReducer from "../../src/reducers/orderListReducer";
import { GET_ORDERLIST, ORDERLIST_LOADING, SET_ACTIVE_ORDER, RESET_ACTIVE_ORDER, ADD_ITEM_TO_ORDER, DELETE_ITEM_FROM_ORDER, CHECKOUT_ORDER } from "../../src/actions/types";
import expect from "expect";

const initialState = {
  orderLists: null,
  activeOrder: null,
  loading: false
};

describe("orderlist reducer", () => {
  test("should return the initial state", () => {
    expect(orderListReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle ORDERLIST_LOADING", () => {
    expect(orderListReducer(initialState, { type: ORDERLIST_LOADING })).toEqual({
      ...initialState,
      loading: true
    });
  });

  test("should handle GET_ORDERLIST", () => {
    expect(orderListReducer(initialState, { type: GET_ORDERLIST, payload: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }], user: "1", customer: "2" }] })).toEqual({
      ...initialState,
      orderLists: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }], user: "1", customer: "2" }],
      loading: false
    });
  });

  test("should handle SET_ACTIVE_ORDER", () => {
    expect(orderListReducer(initialState, { type: SET_ACTIVE_ORDER, payload: "1" })).toEqual({
      ...initialState,
      activeOrder: "1"
    });
  });

  test("should handle RESET_ACTIVE_ORDER", () => {
    expect(orderListReducer({ ...initialState, activeOrder: "1" }, { type: RESET_ACTIVE_ORDER })).toEqual({
      ...initialState,
      activeOrder: null
    });
  });

  test("should handle ADD_ITEM_TO_ORDER", () => {
    expect(
      orderListReducer(
        { ...initialState, orderLists: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }], user: "1", customer: "2" }] },
        { type: ADD_ITEM_TO_ORDER, payload: { _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }, { foodItem: "2", _id: "2", itemCount: 2 }], user: "1", customer: "2" } }
      )
    ).toEqual({
      ...initialState,
      orderLists: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }, { foodItem: "2", _id: "2", itemCount: 2 }], user: "1", customer: "2" }]
    });
  });

  test("should handle ADD_ITEM_TO_ORDER for non-existing order", () => {
    expect(
      orderListReducer(
        { ...initialState, orderLists: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }], user: "1", customer: "2" }] },
        { type: ADD_ITEM_TO_ORDER, payload: { _id: "2", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }, { foodItem: "2", _id: "2", itemCount: 2 }], user: "1", customer: "2" } }
      )
    ).toEqual({
      ...initialState,
      orderLists: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }], user: "1", customer: "2" }]
    });
  });

  test("should handle DELETE_ITEM_FROM_ORDER", () => {
    expect(
      orderListReducer(
        { ...initialState, orderLists: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }, { foodItem: "2", _id: "2", itemCount: 2 }], user: "1", customer: "2" }] },
        { type: DELETE_ITEM_FROM_ORDER, payload: { _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }], user: "1", customer: "2" } }
      )
    ).toEqual({
      ...initialState,
      orderLists: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }], user: "1", customer: "2" }]
    });
  });

  test("should handle DELETE_ITEM_FROM_ORDER for non-existing order", () => {
    expect(
      orderListReducer(
        { ...initialState, orderLists: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }, { foodItem: "2", _id: "2", itemCount: 2 }], user: "1", customer: "2" }] },
        { type: DELETE_ITEM_FROM_ORDER, payload: { _id: "2", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }], user: "1", customer: "2" } }
      )
    ).toEqual({
      ...initialState,
      orderLists: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }, { foodItem: "2", _id: "2", itemCount: 2 }], user: "1", customer: "2" }]
    });
  });

  test("should handle CHECKOUT_ORDER", () => {
    expect(
      orderListReducer(
        { ...initialState, orderLists: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }], user: "1", customer: "2", status: true }] },
        { type: CHECKOUT_ORDER, payload: { _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }], user: "1", customer: "2", status: false } }
      )
    ).toEqual({
      ...initialState,
      orderLists: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }], user: "1", customer: "2", status: false }]
    });
  });

  test("should handle CHECKOUT_ORDER", () => {
    expect(
      orderListReducer(
        { ...initialState, orderLists: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }], user: "1", customer: "2", status: true }] },
        { type: CHECKOUT_ORDER, payload: { _id: "2", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }], user: "1", customer: "2", status: false } }
      )
    ).toEqual({
      ...initialState,
      orderLists: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: "1", _id: "1", itemCount: 1 }], user: "1", customer: "2", status: true }]
    });
  });
});
