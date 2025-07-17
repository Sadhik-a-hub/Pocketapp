import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../details/todos/todoThunks";
import { uploadAadhaarThunk } from "../details/auth/authThunks";
import { logout } from "../details/auth/authSlice";

import TodoForm from "./TodoForm";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { todos } = useSelector((state) => state.todos);
  const { user } = useSelector((state) => state.auth);

  const [filter, setFilter] = useState("all");
  const [editTask, setEditTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    dispatch(fetchTodos());
   
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleFileChange = (e) => {
    setAadhaarFile(e.target.files[0]);
    setUploadSuccess("");
    setUploadError("");
  };

  const handleUpload = async () => {
    if (!aadhaarFile) return setUploadError("Please select a file.");
    try {
      await dispatch(uploadAadhaarThunk(aadhaarFile)).unwrap();
      setUploadSuccess("Aadhaar uploaded successfully.");
      setAadhaarFile(null);
    } catch {
      setUploadError("Upload failed. Try again.");
    }
  };

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const today = new Date().toISOString().split("T")[0];
  const filteredTodos = todos.filter((task) => {
    const started = new Date(task.startedAt).toISOString().split("T")[0];
    if (filter === "completed") return task.status.toLowerCase() === "complete";
    if (filter === "incomplete")
      return task.status.toLowerCase() !== "complete";
    if (filter === "today") return started === today;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.status.toLowerCase() === "complete")
      .length,
    incomplete: todos.filter((t) => t.status.toLowerCase() !== "complete")
      .length,
    today: todos.filter(
      (t) => new Date(t.startedAt).toISOString().split("T")[0] === today
    ).length,
  };

  return (
    <div
      className="container-fluid min-vh-100 py-4"
      style={{
        background: "linear-gradient(to right, #f0f8ff, #e6ffe6)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <div>
            <h2 className="fw-bold">Welcome, {user?.fullname || "User"}</h2>
            {user?.aadhaarCardPath && (
              <div>
                <small className="text-success">Aadhaar Uploaded ✔</small>
              </div>
            )}
          </div>

          <div className="d-flex flex-wrap gap-2">
            <div>
              <h6 className="mb-1">Upload Aadhaar</h6>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="form-control mb-2"
                onChange={handleFileChange}
              />
              <button
                className="btn btn-sm btn-primary w-100"
                onClick={handleUpload}
              >
                Upload
              </button>
              {uploadSuccess && (
                <div className="alert alert-success mt-2 py-1">
                  {uploadSuccess}
                </div>
              )}
              {uploadError && (
                <div className="alert alert-danger mt-2 py-1">
                  {uploadError}
                </div>
              )}
            </div>

            <div className="d-flex flex-column justify-content-between">
              <button
                className="btn btn-primary mb-2"
                onClick={() => {
                  setEditTask(null);
                  setShowForm(true);
                }}
              >
                <i className="fas fa-plus me-1"></i> Add Task
              </button>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-1"></i> Logout
              </button>
            </div>
          </div>
        </div>

        <div className="row text-center mb-4">
          {["Total", "Completed", "Incomplete", "Today"].map((label, idx) => {
            const color = ["primary", "success", "danger", "warning"][idx];
            const key = label.toLowerCase();
            return (
              <div className="col" key={label}>
                <div
                  className={`p-3 bg-${color} ${
                    color === "warning" ? "text-dark" : "text-white"
                  } rounded shadow`}
                >
                  <strong>{label}:</strong> {stats[key]}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center my-4">
          <div className="dropdown d-inline-block">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i className="fas fa-filter me-2"></i>
              Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
            <ul className="dropdown-menu">
              {["all", "completed", "incomplete", "today"].map((type) => (
                <li key={type}>
                  <button
                    className="dropdown-item"
                    onClick={() => setFilter(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row g-3">
          {filteredTodos.map((task) => {
            const isComplete = task.status.toLowerCase() === "complete";
            return (
              <div className="col-md-4" key={task._id}>
                <div
                  className="card p-3 h-100 shadow-sm"
                  style={{
                    cursor: "pointer",
                    borderLeft: `5px solid ${isComplete ? "green" : "orange"}`,
                    transition: "0.3s",
                    minHeight: "220px",
                  }}
                  onClick={() => {
                    setEditTask(task);
                    setShowForm(true);
                  }}
                  onMouseEnter={(e) =>
                    e.currentTarget.classList.add("shadow-lg", "bg-light")
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget.classList.remove("shadow-lg", "bg-light")
                  }
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold mb-0">{task.title}</h5>
                    <span
                      className={`fs-4 ${
                        isComplete ? "text-success" : "text-danger"
                      }`}
                    >
                      {isComplete ? "✔️" : "⏳"}
                    </span>
                  </div>
                  <p className="text-muted mb-2">{task.description}</p>
                  <div className="mb-2">
                    <small className="text-secondary d-block">
                      <i className="fas fa-play text-success me-1"></i>
                      Started: {formatDateTime(task.startedAt)}
                    </small>
                    {isComplete && task.completedAt && (
                      <small className="text-secondary d-block">
                        <i className="fas fa-check text-primary me-1"></i>
                        Completed: {formatDateTime(task.completedAt)}
                      </small>
                    )}
                  </div>
                  <span
                    className={`badge ${
                      isComplete ? "bg-success" : "bg-warning text-dark"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {showForm && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
            style={{ zIndex: 1050 }}
          >
            <div
              className="bg-white rounded shadow p-4"
              style={{ maxWidth: "600px", width: "100%" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-primary mb-0">
                  {editTask ? "Edit Task" : "Add Task"}
                </h4>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    setEditTask(null);
                    setShowForm(false);
                  }}
                >
                  ✕
                </button>
              </div>
              <TodoForm
                refreshTodos={() => {
                  dispatch(fetchTodos());
                  setShowForm(false);
                }}
                editTask={editTask}
                setEditTask={setEditTask}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
