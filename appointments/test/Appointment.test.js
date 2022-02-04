import React from "react";
import ReactDOM from "react-dom";
import { Appointment, AppointmentsDayView } from "../src/Appointment";
import ReactTestUtils from "react-dom/test-utils";

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

describe("AppointmentsDayView", () => {
  let container;
  let appointments;

  beforeEach(() => {
    container = document.createElement("div");
    const today = new Date();
    appointments = [
      { startAt: today.setHours(12, 0), customer: { firstName: "Nara" } },
      { startAt: today.setHours(13, 0), customer: { firstName: "Sarisa" } },
    ];
  });

  const render = (component) => ReactDOM.render(component, container);

  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toMatch(
      "There are no appointments scheduled for today."
    );
  });

  it("selects the first appointments by default", () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.textContent).toMatch("Nara");
  });

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.querySelector("div#appointments-DayView")).not.toBeNull();
  });

  it("renders multiple appointments in an ol element", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelector("ol")).not.toBeNull();
    expect(container.querySelector("ol").children).toHaveLength(2);
  });

  it("renders each appointment in an li", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelectorAll("li")).toHaveLength(2);
    expect(container.querySelectorAll("li")[0].textContent).toEqual("12:00");
    expect(container.querySelectorAll("li")[1].textContent).toEqual("13:00");
  });
  it("has a button element in each li", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelectorAll("li > button")).toHaveLength(2);
    expect(container.querySelectorAll("li > button")[0].type).toEqual("button");
  });
  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={appointments} />);

    const button = container.querySelectorAll("button")[1];
    ReactTestUtils.Simulate.click(button);

    expect(container.textContent).toMatch("Sarisa");
  });
});
