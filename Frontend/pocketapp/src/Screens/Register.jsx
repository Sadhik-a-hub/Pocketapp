import React, { useState } from "react";
import { validateRegistration } from "../Screens/Validation";
import { registerUser } from "../service/api";
import { useNavigate, Link } from "react-router-dom";


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

        setFormData({
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/login");
      } catch (error) {
        alert(error.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Branding Side */}
        <div
          className="col-md-6 d-none d-md-flex align-items-center justify-content-center"
          style={{
            background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
            color: "white",
          }}
        >
          <div className="text-center p-4">
            <h1 className="display-4 fw-bold">My PocketApp</h1>
            <p className="lead">
              Track your tasks, plan your wallet, and stay in control.
            </p>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
          <div className="card p-4 shadow-lg w-50">
            <h3 className="text-center mb-4 text-success">Create Account</h3>
            <form onSubmit={handleSubmit}>
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
                  className="position-absolute top-50 end-0 translate-middle-y me-3 text-info"
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
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3 text-info"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </span>
              </div>

              <button type="submit" className="btn btn-success w-100 mb-3">
                Sign Up
              </button>

              <div className="text-center">
                Already have an account?
                <Link
                  to="/login"
                  className="text-decoration-none text-info fw-bold"
                >
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
