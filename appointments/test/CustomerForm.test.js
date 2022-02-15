import React from "react";
import { createContainer } from "./domManipulators";
import { CustomerForm } from "../src/CustomerForm";
import ReactTestUtils from "react-dom/test-utils";

describe("CustomerForm", () => {
  let render, container;
  const form = (id) => container.querySelector(`form[id="${id}"]`);

  const field = (name) => form("customer").elements[name];

  const expectToBeInputFieldOfTypeText = (formElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual("INPUT");
    expect(formElement.type).toEqual("text");
  };

  const labelFor = (formElement) => {
    return container.querySelector(`label[for="${formElement}"]`);
  };
  const itRendersAsATextBox = (fieldName) =>
    it("rendered as a text box", () => {
      render(<CustomerForm />);

      expectToBeInputFieldOfTypeText(field(fieldName));
    });

  const itIncludesTheExistingValue = (fieldName, value) =>
    it("includes the existing value for the first name", () => {
      render(<CustomerForm {...{ [fieldName]: value }} />);

      expect(field(fieldName).value).toEqual(value);
    });

  const itRendersALabel = (fieldName, label) =>
    it("renders a label", () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(label);
    });

  const itAssignAnIdThatMatchLabelId = (fieldName, labelId) =>
    it("assigns an id that matches the label id", () => {
      render(<CustomerForm />);
      expect(field(fieldName).id).toEqual(labelId);
    });

  const itSaveExistingValueWhenSubmit = (fieldName) =>
    it("saves existing value when submitted", async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: "existingValue" }}
          onSubmit={(props) =>
            expect(props[fieldName]).toEqual("existingValue")
          }
        />
      );

      await ReactTestUtils.Simulate.submit(form("customer"));
    });

  const itSaveNewValueWhenSubmit = (fieldName, newValue) =>
    it("saves new valuej when submitted", async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: "existingValue" }}
          onSubmit={(props) => expect(props[fieldName]).toEqual(newValue)}
        />
      );

      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value: newValue, name: fieldName },
      });
      await ReactTestUtils.Simulate.submit(form("customer"));
    });
  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  describe("first name field", () => {
    itRendersAsATextBox("firstName");
    itIncludesTheExistingValue("firstName", "Nara");
    itRendersALabel("firstName", "First Name");
    itAssignAnIdThatMatchLabelId("firstName", "firstName");
    itSaveExistingValueWhenSubmit("firstName");
    itSaveNewValueWhenSubmit("firstName", "Nara-newvalue");
  });

  describe("last name field", () => {
    itRendersAsATextBox("lastName");
    itIncludesTheExistingValue("lastName", "Nara");
    itRendersALabel("lastName", "Last Name");
    itAssignAnIdThatMatchLabelId("lastName", "lastName");
    itSaveExistingValueWhenSubmit("lastName");
    itSaveNewValueWhenSubmit("lastName", "Nara-newvalue");
  });
  describe("phone field", () => {
    itRendersAsATextBox("phone");
    itIncludesTheExistingValue("phone", "012345");
    itRendersALabel("phone", "phone");
    itAssignAnIdThatMatchLabelId("phone", "phone");
    itSaveExistingValueWhenSubmit("phone");
    itSaveNewValueWhenSubmit("phone", "67890");
  });
});
