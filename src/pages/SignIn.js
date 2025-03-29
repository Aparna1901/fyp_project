import React, { useState } from "react";
import "./SignIn.css"; // Add your custom CSS for styling
// import logo from "./logo.png"; // Replace with the actual logo path
import {useNavigate} from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();


  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinLength = password.length >= 8;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (password.trim() === "") {
        newErrors.password = "Password is required";
      } else if (!hasUpperCase || !hasLowerCase || !hasSpecialChar || !hasMinLength) {
        newErrors.password =
          "Password must contain at least 8 characters, including uppercase, lowercase, and a special character.";
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid. Proceed with submission.");
      console.log("Email:", email);
      console.log("Password:", password);
      navigate('/Dashboard')
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const handleOnClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form is valid!");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        {/* <img src={logo} alt="Logo" className="signin-logo" /> */}
        <h4 className="signin-title">Sign In</h4>
        <p className="signin-subtitle">Enter your email and password to sign in!</p>
        <form onSubmit={handleSignIn}>
        <div className="input-group">
          <label className="input-label" htmlFor="email">
            Email*
          </label>
          <input
            id="email"
            type="text"
            className="input-field"
            placeholder="mail@simple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="password">
            Password*
          </label>
          <div className="password-container">
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              className="input-field"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
          </div>
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="forgot-password">
          <a href="/forgot-password" className="forgot-link">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="signin-button">
          Sign In
        </button>
        </form>
      </div>
    </div>
  );
}
