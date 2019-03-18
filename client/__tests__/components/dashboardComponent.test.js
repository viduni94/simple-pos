import React from "react";
import { shallow } from "enzyme";
import { Dashboard } from "../../src/components/dashboard/Dashboard";
import Spinner from "../../src/components/common/spinner";

const props = {
  getOpenOrderList: jest.fn().mockReturnThis(),
  setActivePage: jest.fn().mockReturnThis(),
  resetActiveOrder: jest.fn().mockReturnThis(),
  auth: {
    isAuthenticated: "",
    user: { id: "1" }
  },
  errors: {},
  page: {active: "dashboard"},
  orderList: { orderLists: [{ _id: "1", orderDate: "2019-03-05", orderItems: [{ foodItem: { _id: "1", name: "Mocha", unitPrice: "500" }, id: "1", itemCount: 1 }], user: "1", customer: "2" }] }
};

describe("Dashboard Component", () => {
  test("renders", done => {
    const wrapper = shallow(<Dashboard {...props} />);
    expect(wrapper).toHaveLength(1);
    done();
  });

  const testProps = { ...props, orderList: { orderLists: [] } };
  test("renders when no open orders", done => {
    const wrapper = shallow(<Dashboard {...testProps} />);
    expect(wrapper).toHaveLength(1);
    done();
  });

  const testProps1 = { ...props, orderList: { orderLists: [], loading: true } };
  test("renders when orders are loading", done => {
    const wrapper = shallow(<Dashboard {...testProps1} />);
    const spinner = shallow(<Spinner />);
    expect(wrapper).toHaveLength(1);
    expect(spinner).toHaveLength(1);
    done();
  });

  test("getTotalBillAmount method gives proper results", done => {
    const wrapper = shallow(<Dashboard {...props} />);
    const instance = wrapper.instance();

    expect(wrapper.instance().props.orderList.orderLists).toHaveLength(1);
    expect(instance.getTotalBillAmount("1")).toBe(500);
    done();
  });

  test("getTotalBillAmount method when order does not match", done => {
    const wrapper = shallow(<Dashboard {...props} />);
    const instance = wrapper.instance();

    expect(wrapper.instance().props.orderList.orderLists).toHaveLength(1);
    instance.getTotalBillAmount("2");

    done();
  });

  test("getTotalBillAmount method when orderLists is null", done => {
    const wrapper = shallow(<Dashboard {...props} />);
    wrapper.setProps({ orderList: { orderLists: [] } });
    const instance = wrapper.instance();
    expect(wrapper.instance().props.orderList.orderLists).toHaveLength(0);
    instance.getTotalBillAmount("1");

    done();
  });
});
