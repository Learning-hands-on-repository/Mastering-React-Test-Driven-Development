import React from "react";
import { createContainer } from "./domManipulators";
import { AppointmentForm } from "../src/AppointmentForm";
import ReactTestUtils from "react-dom/test-utils";
describe("AppointmentForm", () => {
  let render, container;
  beforeEach(() => {
    ({ render, container } = createContainer());
  });
  const form = (id) => container.querySelector(`form[id="${id}"]`);
  const field = (name) => form("appointment").elements[name];
  const findOption = (dropdownNode, textContent) => {
    const options = Array.from(dropdownNode.childNodes);
    return options.find((option) => option.textContent === textContent);
  };
  const labelFor = (formElement) => {
    return container.querySelector(`label[for="${formElement}"]`);
  };
  it("renders a form", () => {
    render(<AppointmentForm />);
    expect(form("appointment")).not.toBeNull();
  });

  describe("service field", () => {
    it("renders as a select box", () => {
      render(<AppointmentForm />);
      expect(field("service")).not.toBeNull();
      expect(field("service").tagName).toEqual("SELECT");
    });

    it("initially has a blank value chosen", () => {
      render(<AppointmentForm />);
      const firstNode = field("service").childNodes[0];

      expect(firstNode.value).toEqual("");
      expect(firstNode.selected).toBeTruthy();
    });

    it("lists all salon services", () => {
      const selectableServices = ["Cut", "Blow-dry"];

      render(<AppointmentForm selectableServices={selectableServices} />);

      // use Array.from to take snap shot of option element
      const optionNodes = Array.from(field("service").childNodes);
      const renderedServices = optionNodes.map((node) => node.textContent);
      expect(renderedServices).toEqual(
        expect.arrayContaining(selectableServices)
      );
    });

    it("pre-select the existing value", () => {
      const services = ["Cut", "Blow-dry"];

      render(
        <AppointmentForm selectableServices={services} service="Blow-dry" />
      );

      const option = findOption(field("service"), "Blow-dry");
      expect(option.selected).toBeTruthy();
    });

    it("renders a label", () => {
      render(<AppointmentForm />);
      expect(labelFor("service")).not.toBeNull();
      expect(labelFor("service").textContent).toEqual("service");
    });

    it("assigns an id that matches the label id", () => {
      render(<AppointmentForm />);
      expect(field("service").id).toEqual("service");
    });

    it("saves existing value when submitted", async () => {
      expect.hasAssertions();
      render(
        <AppointmentForm
          {...{ ["service"]: "existingValue" }}
          onSubmit={(props) =>
            expect(props["service"]).toEqual("existingValue")
          }
        />
      );

      await ReactTestUtils.Simulate.submit(form("appointment"));
    });

    it("saves new value when submitted", async () => {
      expect.hasAssertions();
      render(
        <AppointmentForm
          {...{ ["service"]: "existingValue" }}
          onSubmit={(props) => expect(props["service"]).toEqual("newValue")}
        />
      );

      await ReactTestUtils.Simulate.change(field("service"), {
        target: { value: "newValue", name: "service" },
      });
      await ReactTestUtils.Simulate.submit(form("appointment"));
    });

    describe("time slot table", () => {
      const timeSlotTable = () => container.querySelector("table#time-slots");

      it("renders a table for times slot", () => {
        render(<AppointmentForm />);
        expect(timeSlotTable()).not.toBeNull();
      });

      it("renders a time slot for every half an hour between open and close times", () => {
        render(<AppointmentForm salonOpensAt={9} salonClosesAt={11} />);

        const timesOfDay = timeSlotTable().querySelectorAll("tbody >* th");

        expect(timesOfDay).toHaveLength(4);
        expect(timesOfDay[0].textContent).toEqual("09:00");
        expect(timesOfDay[1].textContent).toEqual("09:30");
        expect(timesOfDay[3].textContent).toEqual("10:30");
      });

      it("renders an empty call at the start of the header row", () => {
        render(<AppointmentForm />);

        const headerRow = timeSlotTable().querySelector("thead > tr");

        expect(headerRow.firstChild.textContent).toEqual("");
      });

      it("renders a week of available dates", () => {
        const today = new Date(2018, 11, 1);
        render(<AppointmentForm today={today} />);
        const dates = timeSlotTable().querySelectorAll(
          "thead >* th:not(:first-child)"
        );
        expect(dates).toHaveLength(7);
        expect(dates[0].textContent).toEqual("Sat 01");
        expect(dates[1].textContent).toEqual("Sun 02");
        expect(dates[6].textContent).toEqual("Fri 07");
      });
    });
  });
});
