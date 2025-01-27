import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="row text-center">
        <h1 className="mb-4">Welcome to Our Portal</h1>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Patient Dashboard</h5>
              <p className="card-text">Access your medical records and appointments.</p>
              <Link to="/patient" className="btn btn-primary">
                Go to Patient Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Doctor Dashboard</h5>
              <p className="card-text">Manage your appointments and patient information.</p>
              <Link to="/doctor" className="btn btn-success">
                Go to Doctor Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
