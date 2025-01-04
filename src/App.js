import React from "react";
import AppointmentList from "./components/Doctor/AppointmentList";
// import SlotAllotment from "./components/SlotAllotment";
import PrescriptionForm from "./components/Doctor/PrescriptionForm";
import Insights from "./components/Doctor/Insights";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Profile from "./components/Doctor/Profile";


function App() {
  return (
    <div className="dashboard">
      <header className="header">
        <h1>Doctor's Dashboard</h1>
      </header>
      <Insights />
      <div className="content">
        <div className="section">
          <AppointmentList />
          {/* <SlotAllotment /> */}
        </div>
        <div className="section">
          <PrescriptionForm />
      
        </div>
        <div className="section">
          <Profile/>
        </div>
      </div>
    </div>
  );
}

export default App;
