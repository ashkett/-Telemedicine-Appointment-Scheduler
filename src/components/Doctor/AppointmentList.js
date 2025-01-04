import React, { useState } from "react";
import '../../App.css'

function Appointment() {
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState("");

  // Add a new slot
  const addSlot = () => {
    if (time && !slots.includes(time)) {
      setSlots([...slots, time]);
      setTime(""); // Clear input
    }
  };

  // Remove a slot
  const removeSlot = (slot) => {
    setSlots(slots.filter((s) => s !== slot));
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Set Available Slots</h2>

      {/* Card Container */}
      <div className="card border-0 shadow-lg p-4">
        {/* Input and Button */}
        <div className="row mb-3">
          <div className="col-md-9">
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="col-md-3 text-center">
            <button
              className="btn btn-primary w-100"
              onClick={addSlot}
              disabled={!time}
            >
              Add Slot
            </button>
          </div>
        </div>

        {/* Slots List */}
        {slots.length > 0 ? (
          <ul className="list-group">
            {slots.map((slot, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{slot}</span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeSlot(slot)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted">No slots added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Appointment;
