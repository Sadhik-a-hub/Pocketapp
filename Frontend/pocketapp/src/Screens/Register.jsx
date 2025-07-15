import React, { useState } from "react";
import { validateRegistration } from "../Screens/Validation";
import { registerUser } from "../Screens/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "email" ? value.toLowerCase() : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegistration(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await registerUser(formData);
        alert("Registration successful!");
        navigate("/");
      } catch (error) {
        alert(error.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100" style={{ maxWidth: "1000px" }}>
        {/* Left Section */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light rounded-start">
          <div className="text-center p-4">
            <h2 className="text-primary">Welcome to Pocket App</h2>
            <p className="text-muted">
              With <strong>MyPocket</strong>, stay on top of your tasks, goals,
              and plans — all in one beautifully simple space.
            </p>
            {/* Optional image */}
            {/* <img src="/assets/register-img.png" className="img-fluid mt-3" alt="Welcome" /> */}
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-6 bg-white p-4 shadow rounded-end">
          <h3 className="text-center mb-4">Create Account</h3>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                className={`form-control ${
                  errors.fullname ? "is-invalid" : ""
                }`}
                value={formData.fullname}
                onChange={handleChange}
              />
              {errors.fullname && (
                <div className="invalid-feedback">{errors.fullname}</div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3 text-primary"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <div className="mb-3 position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3 text-primary"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 mb-3"
              style={{ height: "50px" }}
            >
              Sign Up
            </button>

            {/* Login link */}
            <div className="text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary"
                style={{ textDecoration: "none" }}
              >
                Log In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
