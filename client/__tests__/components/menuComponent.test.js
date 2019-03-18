import React from "react";
import { shallow } from "enzyme";
import { Menu } from "../../src/components/menu/Menu";
import Spinner from "../../src/components/common/spinner";
import { wrap } from "module";

const props = {
  item: {},
  getFoodItems: jest.fn().mockReturnThis(),
  callbackFromParent: jest.fn().mockReturnThis()
};

describe("FoodItem Component", () => {
  test("renders", done => {
    const wrapper = shallow(<Menu {...props} />);
    expect(wrapper).toHaveLength(1);
    done();
  });

  test("should render initial layout", () => {
    // when
    const component = shallow(<Menu {...props} />);
    // then
    expect(component.getElements()).toMatchSnapshot();
  });

  const testProps = { ...props, item: { items: [] } };
  test("renders when there are no items", done => {
    const wrapper = shallow(<Menu {...testProps} />);
    const spinner = shallow(<Spinner />);
    expect(wrapper).toHaveLength(1);
    expect(spinner).toHaveLength(1);
    done();
  });
});
