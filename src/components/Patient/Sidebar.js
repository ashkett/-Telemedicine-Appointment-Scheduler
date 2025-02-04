import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/Sidebar.css"; // Add a CSS file for custom styles
import CalendarComponent from "../Common/Calander"

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-flex">
      <button
        className="btn btn-primary toggle-btn"
        onClick={toggleSidebar}
        style={{ position: "fixed", top: "20px", left: "20px", zIndex: 1050 }}
      >
        {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </button>

      <div
        className={`sidebar ${isOpen ? "open" : ""}`}
        style={{
          backgroundColor: "#2c3e50", // Dark Blue
          color: "#ecf0f1",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "300px",
          transform: `translateX(${isOpen ? "0" : "-100%"})`,
          transition: "transform 0.3s ease-in-out",
          zIndex: 1049,
        }}
      >
        <div className="sidebar-header" style={{ padding: "20px", textAlign: "center" }}>
          <h3 style={{ fontWeight: "bold" }}>Patient Dashboard</h3>
        </div>
        <div className="sidebar-body">
          <ul className="list-group list-unstyled">
            <li className="list-group-item">
              <Link to="/dashboard" className="text-decoration-none text-light">
                <i className="fas fa-tachometer-alt me-2"></i> Dashboard
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/appointments" className="text-decoration-none text-light">
                <i className="fas fa-calendar-alt me-2"></i> Book Appointments
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/medical-records" className="text-decoration-none text-light">
                <i className="fas fa-file-medical me-2"></i> Medical Records
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/messages" className="text-decoration-none text-light">
                <i className="fas fa-envelope me-2"></i> Messages
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`overlay ${isOpen ? "active" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          visibility: isOpen ? "visible" : "hidden",
          opacity: isOpen ? "1" : "0",
          transition: "opacity 0.3s ease-in-out",
          zIndex: 1048,
        }}
        onClick={toggleSidebar}
      ></div>

<div className="">
<CalendarComponent/>

</div>



    </div>
  );
}

export default Sidebar;
