import React from "react";
import { shallow } from "enzyme";
import { FoodItem } from "../../src/components/menu/FoodItem";

const props = {
  item: {},
  page: {},
  category: { _id: "1", name: "abc", menu: "1", unitPrice: 500 },
  callbackFromParent: jest.fn().mockReturnThis()
};

describe("FoodItem Component", () => {
  test("renders", done => {
    const wrapper = shallow(<FoodItem {...props} />);
    expect(wrapper).toHaveLength(1);
    done();
  });

  test("should render initial layout", () => {
    // when
    const component = shallow(<FoodItem {...props} />);
    // then
    expect(component.getElements()).toMatchSnapshot();
  });

  test("selectedItem method gives proper results", done => {
    const wrapper = shallow(<FoodItem {...props} />);
    const instance = wrapper.instance();

    instance.selectedItem("1", "abc", 500);
    expect(instance.props.callbackFromParent).toBeCalledWith({ foodItem: "1", name: "abc", price: 500, itemCount: 1 });
    done();
  });

});
