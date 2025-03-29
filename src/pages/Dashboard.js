import React from "react";
import "./Dashboard.css"; // CSS file for styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="card-row">
        {/* View/Update Profile Card */}
        {/* <div className="card">
          <div className="card-header">
            <h2>View/Update Profile</h2>
          </div>
          <p>Check if your profile is up to date</p>
          <div className="card-footer">
            <a href="/profile" className="card-link">
              Visit
            </a>
            <img
              src="https://img.icons8.com/color/48/000000/gear.png"
              alt="Profile Icon"
              className="card-icon"
            />
          </div>
        </div> */}

        {/* View Report Card */}
        <div className="card">
          <div className="card-header">
            <h2>View Report</h2>
          </div>
          <p>View status of cases uploaded by you.</p>
          <div className="card-footer">
            <a href="/report" className="card-link">
              Visit
            </a>
            <img
              src="https://img.icons8.com/color/48/000000/computer.png"
              alt="Report Icon"
              className="card-icon"
            />
          </div>
        </div>

        {/* Model Prediction Card */}
        <div className="card">
          <div className="card-header">
            <h2>Model Prediction</h2>
          </div>
          <p>Get the predictions.</p>
          <div className="card-footer">
            <a href="/patient-details" className="card-link">
              Visit
            </a>
            <img
              src="https://img.icons8.com/color/48/000000/idea.png"
              alt="Prediction Icon"
              className="card-icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
