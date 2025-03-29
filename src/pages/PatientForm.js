import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PatientDetails.css";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    address: "",
    mobileNumber: "",
    emailAddress: "",
    file: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      alert("Please upload an image!");
      return;
    }

    const uploadData = new FormData();
    uploadData.append("file", formData.file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response from server:", response.data);

      const { result, filename } = response.data;
      // Navigate to the result page with the data
      navigate("/result", { state: { result, filename } });
    } catch (error) {
      console.error("Error during prediction:", error);
      alert("Prediction failed! Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Patient Details</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="patientName">Patient Name :</label>
            <input
              type="text"
              id="patientName "
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter patient name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="patientAge">Patient Age :</label>
            <input
              type="number"
              id="patientAge"
              name="patientAge"
              value={formData.patientAge}
              onChange={handleChange}
              placeholder="Enter patient age"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address :</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number :</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="emailAddress">Email Address :</label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>
          {/* Add form fields here */}
          <div className="form-group">
            <label htmlFor="file">Upload Image :</label>
            <input type="file" id="file" onChange={handleFileChange} required />
          </div>
          <button type="submit">Predict</button>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
