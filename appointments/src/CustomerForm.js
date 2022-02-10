import React from "react";

export const CustomerForm = ({ firstName }) => (
  <form id="customer">
    <label htmlFor="firstName">First Name</label>
    <input
      type="text"
      name="firstName"
      value={firstName}
      readOnly
      id="firstName"
    />
  </form>
);
