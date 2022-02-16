import React, { useState } from "react";

export const AppointmentForm = ({ selectableServices, service, onSubmit }) => {
  const [appointment, setAppointment] = useState({ service });

  const handleChange = ({ target }) => {
    setAppointment((appointment) => ({
      ...appointment,
      [target.name]: target.value,
    }));
  };

  return (
    <form id="appointment" onSubmit={() => onSubmit(appointment)}>
      <label htmlFor="service">service</label>
      <select
        name="service"
        id="service"
        value={service}
        readOnly
        onChange={handleChange}
      >
        <option></option>
        {selectableServices.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
    </form>
  );
};

AppointmentForm.defaultProps = {
  selectableServices: [
    "Cut",
    "Blow-dry",
    "Cut & color",
    "Beard trim",
    "Cut & bread trim",
    "Extensions",
  ],
};
