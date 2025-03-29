import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PredictionResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { result, filename } = location.state || {};

  if (!result || !filename) {
    return (
      <div className="flex justify-center items-center h-screen text-center">
        <p className="text-lg text-gray-600">
          No prediction data available. Please upload an image first.
        </p>
      </div>
    );
  }

  const imageUrl = `http://127.0.0.1:5000/uploads/${filename}`;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl flex flex-col lg:flex-row items-center">
        {/* Image Section */}
        <div className="flex flex-col items-center lg:w-1/2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Patient Original MRI Image
          </h3>
          <img
            src={imageUrl}
            alt="Uploaded MRI"
            className="rounded-lg border border-gray-300"
            style={{
              width: "2in", // Set width to 5 inches
              height: "2in", // Set height to 5 inches
              objectFit: "cover",
            }}
          />
        </div>

        {/* Medical Diagnosis Section */}
        <div className="flex flex-col lg:w-1/2 lg:pl-8 mt-6 lg:mt-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Medical Diagnosis
          </h3>
          <p className="text-gray-700 text-base mb-6">
            <strong>Tumor Type:</strong> {result}
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white  rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 w-20 self-start"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
