import React from "react";
import { shallow } from "enzyme";
import { Login } from "../../src/components/login/Login";

const props = {
  loginUser: jest.fn().mockReturnThis(),
  setActivePage: jest.fn().mockReturnThis(),
  auth: {
    isAuthenticated: ""
  },
  errors: {},
  page: {}
};

describe("Login Component", () => {
  test("renders", done => {
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper).toHaveLength(1);
    done();
  });
  
  const testProps = { ...props, auth: { isAuthenticated: true }, history: [] };
  test("redirects when isAuthenticated is true", done => {
    const wrapper = shallow(<Login {...testProps} />);
    expect(wrapper.instance().props.history.includes("/dashboard")).toBe(true);
    done();
  });

  const testProps1 = { ...props, auth: { isAuthenticated: false }, history: [] };
  test("redirects when isAuthenticated changes to true", done => {
    const wrapper = shallow(<Login {...testProps1} />);
    expect(wrapper.instance().props.history.includes("/dashboard")).toBe(false);
    wrapper.setProps({ auth: { isAuthenticated: true } });
    expect(wrapper.instance().props.history.includes("/dashboard")).toBe(true);
    done();
  });

  test("receive errors", done => {
    const wrapper = shallow(<Login {...props} />);
    wrapper.setProps({ errors: { email: "invalid", password: 'invalid' } });
    expect(wrapper.instance().props.errors.email).toEqual('invalid');
    expect(wrapper.instance().props.errors.password).toEqual('invalid');
    done();
  });

  test("should render initial layout", () => {
    // when
    const component = shallow(<Login {...props} />);
    // then
    expect(component.getElements()).toMatchSnapshot();
  });

  test("when the form is submitted the event is cancelled", done => {
    const wrapper = shallow(<Login {...props} />);
    let prevented = false;

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {
        prevented = true;
      }
    });
    expect(prevented).toBe(true);
    done();
  });

  test("should create an entry in component state with the event value", () => {
    // given
    const component = shallow(<Login {...props} />);
    const form = component.find("input").at(1);
    // when
    form.props().onChange({
      target: {
        name: "email",
        value: "myValue"
      }
    });
    // then
    expect(component.state("email")).toEqual("myValue");
  });
});
