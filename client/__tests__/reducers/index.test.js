import Index from "../../src/reducers/index.js";

it("renders without crashing", () => {
  expect(JSON.stringify(Index)).toMatchSnapshot();
});
