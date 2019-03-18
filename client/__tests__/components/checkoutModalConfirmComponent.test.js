import React from "react";
import { shallow } from "enzyme";
import { CheckoutConfirmModal } from "../../src/components/modals/CheckoutConfirmModal";

const props = {
  orderList: {},
  checkoutOrder: jest.fn().mockReturnThis(),
  toggle: {modal: "", toggle: "", backdrop: true}
};

describe("Checout modal Component", () => {
    test("renders", done => {
      const wrapper = shallow(<CheckoutConfirmModal {...props} />);
      expect(wrapper).toHaveLength(1);
      done();
    });
  
    test("should render initial layout", () => {
      // when
      const component = shallow(<CheckoutConfirmModal {...props} />);
      // then
      expect(component.getElements()).toMatchSnapshot();
    });

})