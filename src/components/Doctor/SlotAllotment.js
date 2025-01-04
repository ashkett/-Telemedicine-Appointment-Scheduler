import React from "react";

function SlotAllotment() {
  return (
    <div>
      <h2>Allot Slots</h2>
      <form>
        <label>
          Patient:
          <input type="text" placeholder="Enter patient name" />
        </label>
        <label>
          Slot:
          <input type="time" />
        </label>
        <button type="submit">Allot</button>
      </form>
    </div>
  );
}

export default SlotAllotment;
