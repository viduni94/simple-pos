import React from "react";
import { shallow } from "enzyme";
import { CreateOrder } from "../../src/components/order/CreateOrder";
import { wrap } from "module";

const props = {
  order: {},
  page: {},
  errors: {},
  customer: {},
  item: { items: [{id: "1", name: "abc", unitPrice: 400, itemCount: 1}]},
  auth: { user: { id: "1" } },
  resetActiveCustomer: jest.fn().mockReturnThis(),
  setActivePage: jest.fn().mockReturnThis()
};

describe("Create Order Component", () => {
  test("renders", done => {
    const wrapper = shallow(<CreateOrder {...props} />);
    expect(wrapper).toHaveLength(1);
    done();
  });

  test("should render initial layout", () => {
    // when
    const component = shallow(<CreateOrder {...props} />);
    // then
    expect(component.getElements()).toMatchSnapshot();
  });
});
