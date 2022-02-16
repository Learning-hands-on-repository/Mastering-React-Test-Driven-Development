import React, { useState } from "react";

export const CustomerForm = ({ firstName, lastName, phone, onSubmit }) => {
  const [customer, setCustomer] = useState({ firstName, lastName, phone });

  const handleChangeFirstName = ({ target }) => {
    setCustomer((customer) => ({ ...customer, [target.name]: target.value }));
  };

  return (
    <form id="customer" onSubmit={() => onSubmit(customer)}>
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        value={firstName}
        id="firstName"
        onChange={handleChangeFirstName}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        value={lastName}
        id="lastName"
        onChange={handleChangeFirstName}
      />
      <label htmlFor="phone">phone</label>
      <input
        type="text"
        name="phone"
        value={phone}
        id="phone"
        onChange={handleChangeFirstName}
      />
      <input type="submit" value="Add" />
    </form>
  );
};
