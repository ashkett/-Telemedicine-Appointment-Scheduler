import React, { useState, useEffect } from "react";
import logo from "../../assets/img/doctor_pfp.png"

function Profile() {
  const [doctorInfo, setDoctorInfo] = useState(null);

  // Mock API call to fetch doctor data
  useEffect(() => {
    // Simulated API response
    const mockData = {
      name: "Dr. John Doe",
      email: "johndoe@example.com",
      phone: "+1234567890",
      address: "123 Health Avenue, MedCity, TX",
      position: "Cardiologist",
      experience: "10 years",
      certificateVerified: true,
    };

    // Simulate a network call delay
    setTimeout(() => setDoctorInfo(mockData), 1000);
  }, []);

  if (!doctorInfo) {
    return <div className="text-center my-5">Loading Profile...</div>;
  }

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Doctor's Profile</h2>

      {/* Profile Card */}
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <div className="row align-items-center">
            {/* Profile Picture Placeholder */}
            <div className="col-md-3 text-center">
              <img
                src={logo}
                alt="Doctor"
                className="rounded-circle img-fluid"
                style={{ width: "100px", height: "100px" }}
              />
            </div>

            {/* Personal Info */}
            <div className="col-md-9">
              <h4>{doctorInfo.name}</h4>
              <p className="mb-1">
                <i className="bi bi-envelope"></i> {doctorInfo.email}
              </p>
              <p className="mb-1">
                <i className="bi bi-telephone"></i> {doctorInfo.phone}
              </p>
              <p className="mb-1">
                <i className="bi bi-geo-alt"></i> {doctorInfo.address}
              </p>

              {/* Verification Badge */}
              <span
                className={`badge ${
                  doctorInfo.certificateVerified ? "bg-success" : "bg-warning"
                }`}
              >
                {doctorInfo.certificateVerified ? "Verified" : "Pending Verification"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Info */}
      <div className="card shadow-lg border-0 mt-4">
        <div className="card-body">
          <h5 className="card-title">Professional Information</h5>
          <p className="mb-1">
            <strong>Position:</strong> {doctorInfo.position}
          </p>
          <p className="mb-1">
            <strong>Experience:</strong> {doctorInfo.experience}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
