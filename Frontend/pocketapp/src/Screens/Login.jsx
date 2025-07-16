import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../details/auth/authThunk";

import { validateLogin } from "./Validation";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" value={formData.email} onChange={handleChange} />
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
        />
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
