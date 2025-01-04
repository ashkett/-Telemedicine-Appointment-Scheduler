import React from "react";

function Insights() {
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Daily Insights</h2>
      <div className="row">
        {/* Total Appointments */}
        <div className="col-md-3">
          <div className="card bg-white text-dark mb-3 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                <i className="fas fa-calendar-check text-primary me-2"></i>
                Total Appointments
              </h5>
              <p className="card-text fs-4">120</p>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="col-md-3">
          <div className="card bg-white text-dark mb-3 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                <i className="fas fa-clock text-info me-2"></i>
                Upcoming Appointments
              </h5>
              <p className="card-text fs-4">15</p>
            </div>
          </div>
        </div>

        {/* Total Profit */}
        <div className="col-md-3">
          <div className="card bg-white text-dark mb-3 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                <i className="fas fa-dollar-sign text-success me-2"></i>
                Total Profit
              </h5>
              <p className="card-text fs-4">$15,000</p>
            </div>
          </div>
        </div>

        {/* Daily Profit */}
        <div className="col-md-3">
          <div className="card bg-white text-dark mb-3 shadow-sm border-0">
            <div className="card-body">
              <h5 className="card-title d-flex align-items-center">
                <i className="fas fa-chart-line text-warning me-2"></i>
                Daily Profit
              </h5>
              <p className="card-text fs-4">$1,200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insights;
