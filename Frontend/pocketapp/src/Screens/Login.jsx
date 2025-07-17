import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserThunk } from "../details/auth/authThunks";
import { validateLogin } from "./Validation";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";



const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const result = await dispatch(loginUserThunk(formData));
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Login successful");
        navigate("/wallet");
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        
        <div
          className="col-md-6 d-none d-md-flex align-items-center justify-content-center text-white"
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
          }}
        >
          <div className="text-center px-4">
            <h1 className="display-3 fw-bold">My PocketApp</h1>
            <p className="lead">
              Manage your tasks and wallet with ease. Organize. Plan. Succeed.
            </p>
          </div>
        </div>

       
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
          <div className="card p-4 shadow-lg w-50">
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="form-group mb-3 position-relative">
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
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

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>

            <div className="mt-3 text-center">
              <Link to="/forgotpassword" className="d-block mb-2 text-danger">
                Forgot Password?
              </Link>
              <Link to="/register" className="text-decoration-none">
                Don’t have an account? <strong>Register</strong>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
