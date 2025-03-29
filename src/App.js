// import React from 'react';
// import './App.css';
// import PatientDetails from './pages/PatientDetails'
import SignIn from './pages/SignIn';
 import Dashboard from './pages/Dashboard';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//       <PatientDetails />
        
//       </header>
    
//     </div>
//   );
// }

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatientForm from "./pages/PatientForm";
import PredictionResult from "./pages/PredictionResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient-details" element={<PatientForm />} />
        <Route path="/result" element={<PredictionResult />} />
      </Routes>
    </Router>
  );
}

export default App;
