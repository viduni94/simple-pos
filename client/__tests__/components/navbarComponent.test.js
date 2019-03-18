import React from "react";
import { shallow } from "enzyme";
import { Navbar } from "../../src/components/layout/Navbar";

const props = {
  logoutUser: jest.fn().mockReturnThis(),
  auth: {
    isAuthenticated: "",
    user: { id: "1" }
  }
};

describe("Navbar Component", () => {
  test("renders", done => {
    const wrapper = shallow(<Navbar {...props} />);
    expect(wrapper).toHaveLength(1);
    done();
  });

  test("logout user method", done => {
    const wrapper = shallow(<Navbar {...props} />);
    wrapper.setProps({ auth: { isAuthenticated: true } });

    const e = { preventDefault: jest.fn() };
    wrapper.instance().onLogoutClick(e);
    expect(wrapper.instance().props.logoutUser).toHaveBeenCalled();
    done();
  });
});
