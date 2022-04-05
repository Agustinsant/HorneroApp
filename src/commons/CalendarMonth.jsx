import React, { useState } from "react";

function CalendarMonth({ setDay }) {
  const [selected, setSelected] = useState("");

  setDay(selected);

  return <div>CalendarMonth</div>;
}

export default CalendarMonth;
