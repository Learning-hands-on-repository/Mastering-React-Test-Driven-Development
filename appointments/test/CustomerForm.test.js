import React from "react";
import { createContainer } from "./domManipulators";
import { CustomerForm } from "../src/CustomerForm";

describe("CustomerForm", () => {
  let render, container;
  const form = (id) => container.querySelector(`form[id="${id}"]`);

  const firstNameField = () => form("customer").elements.firstName;

  const expectToBeInputFieldOfTypeText = (formElement) => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual("INPUT");
    expect(formElement.type).toEqual("text");
  };

  const labelFor = (formElement) => {
    return container.querySelector(`label[for="${formElement}"]`);
  };

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  it("renders the first name field as a text box", () => {
    render(<CustomerForm />);

    expectToBeInputFieldOfTypeText(firstNameField());
  });

  it("includes the existing value for the first name", () => {
    render(<CustomerForm firstName="Nara" />);

    expect(firstNameField().value).toEqual("Nara");
  });

  it("renders a label for the first name field", () => {
    render(<CustomerForm />);
    expect(labelFor("firstName")).not.toBeNull();
    expect(labelFor("firstName").textContent).toEqual("First Name");
  });

  it("assigns an id that matches the label id to the first name", () => {
    render(<CustomerForm />);
    expect(firstNameField().id).toEqual("firstName");
  });
});
