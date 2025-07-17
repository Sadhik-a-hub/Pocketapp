import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { validateForgotPassword } from "./Validation";
import { forgotPassword } from "../service/api";


const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "", newPassword: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForgotPassword(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await forgotPassword(formData);
        toast.success("Password reset successful!");
        setFormData({ email: "", newPassword: "" });
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        toast.error(error.response?.data?.message || "Reset failed");
      }
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Side - Branding */}
        <div
          className="col-md-6 d-none d-md-flex align-items-center justify-content-center text-white"
          style={{
            background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
          }}
        >
          <div className="text-center px-4">
            <h1 className="display-4 fw-bold">My PocketApp</h1>
            <p className="lead">
              Forgot your password? Reset it and get back on track!
            </p>
          </div>
        </div>

        {/* Right Side - Forgot Password Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
          <div className="card p-4 shadow-lg w-75">
            <h3 className="text-center mb-4 text-danger">Reset Password</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3 position-relative">
                <label>New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  className={`form-control ${
                    errors.newPassword ? "is-invalid" : ""
                  }`}
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
                {errors.newPassword && (
                  <div className="invalid-feedback">{errors.newPassword}</div>
                )}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "15px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    userSelect: "none",
                    fontSize: "14px",
                    color: "#007bff",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              <button type="submit" className="btn btn-danger w-100">
                Reset Password
              </button>
            </form>

            <div className="mt-3 text-center">
              <span className="text-muted">
                Remember your password?{" "}
                <a
                  href="/login"
                  className="text-decoration-none fw-bold text-success"
                >
                  Login
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
