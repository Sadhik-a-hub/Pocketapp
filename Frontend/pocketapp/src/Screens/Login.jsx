import React, { useState } from "react";
import { loginUser } from "../Screens/api";
import { validateLogin } from "../Screens/Validation";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "email" ? value.toLowerCase() : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await loginUser(formData);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Login successful!");
        navigate("/Wallet");
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-light">
      <div className="row w-100 mx-auto" style={{ maxWidth: "1000px" }}>
        
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-start p-5 bg-white rounded-start shadow-sm">
          <h1 className="text-primary fw-bold display-4 mb-3">MypocketApp</h1>
          <p className="fs-5 text-secondary">
            "With <strong>MyPocketApp</strong>, stay on top of your tasks, goals,
            and plans—all in one beautifully simple space."
          </p>

          
           
        </div>

  
        <div className="col-md-6 bg-white d-flex align-items-center justify-content-center p-4 rounded-end shadow-sm">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="mb-3">
                <input
                  type="text"
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

              {/* Password */}
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

              {/* Login Button */}
              <button
                className="btn btn-danger w-100 mb-3"
                style={{ height: "50px" }}
                type="submit"
              >
                Log In
              </button>

              {/* Forgot Password */}
              <div className="text-center mb-3">
                <Link to="/forgot-password">Forgotten password?</Link>
              </div>
            </form>

            <hr />

            {/* Register Button */}
            <Link to="/register">
              <button
                className="btn btn-primary w-100"
                style={{ height: "50px" }}
              >
                Create New Account
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
