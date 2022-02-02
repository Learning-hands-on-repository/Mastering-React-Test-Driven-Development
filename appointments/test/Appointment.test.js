import React from "react";
import ReactDOM from "react-dom";
import { Appointment } from "../src/Appointment";
describe("Appointment", () => {
  let customer;
  let container;

  beforeEach(() => {
    container = document.createElement("div");
  });

  const render = (component) => ReactDOM.render(component, container);
  it("renders the customer first name", () => {
    customer = { firstName: "Nara" };

    render(<Appointment customer={customer} />);

    expect(container.textContent).toMatch("Nara");
  });

  it("renders another customer first name", () => {
    customer = { firstName: "Sarisa" };

    render(<Appointment customer={customer} />);

    expect(container.textContent).toMatch("Sarisa");
  });
});
