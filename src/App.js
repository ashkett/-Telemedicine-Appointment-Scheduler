// import React from "react";
// import AppointmentList from "./components/Doctor/AppointmentList";
// // import SlotAllotment from "./components/SlotAllotment";
// import PrescriptionForm from "./components/Doctor/PrescriptionForm";
// import Insights from "./components/Doctor/Insights";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "./App.css";
// import Profile from "./components/Doctor/Profile";
// // import AppSidebar from "./components/Sidebar";
// // import Sidebar from "./components/Sidebar";


// function App() {
//   return (
//     <div className="dashboard">
      
//       <header className="header">
//         <h1>Doctor's Dashboard</h1>
//       </header>
//       {/* <Sidebar/> */}
//       <Insights />
//       <div className="content">
//         <div className="section">
//           <AppointmentList />
//           {/* <SlotAllotment /> */}
//         </div>
//         <div className="section">
//           <PrescriptionForm />
      
//         </div>
//         <div className="section">
//           <Profile/>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;




import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AppointmentList from "./components/Doctor/AppointmentList";
import PrescriptionForm from "./components/Doctor/PrescriptionForm";
import Insights from "./components/Doctor/Insights";
import Profile from "./components/Doctor/Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Sidebar from "./components/Patient/Sidebar";

function DoctorDashboard() {
  return (
    <div className="dashboard">
      <header className="header">
        <h1>Doctor's Dashboard</h1>
        <Link to="/">
        <button type="button" className="btn btn-info">Logout</button></Link>
      </header>
      <div className="content">
        <Insights />
        <div className="section">
          <AppointmentList />
        </div>
        <div className="section">
          <PrescriptionForm />
        </div>
        <div className="section">
          <Profile />
        </div>
      </div>
    </div>
  );
}



 function PatientDashboard() {
  return (
    <div className="container-fluid">
      <Sidebar/>
    </div>
  )
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
