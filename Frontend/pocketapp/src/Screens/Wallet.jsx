import React, { useState, useEffect } from "react";
import TodoForm from "../Screens/todoForm";
import TodoList from "../Screens/todoList";
import { getTodos } from "./api";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Wallet = () => {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("all");
  const [editTask, setEditTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data.tasks);
    } catch (err) {
      console.error("Failed to load todos:", err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const filteredTodos = todos.filter((task) => {
    const startedDate = new Date(task.startedAt).toISOString().split("T")[0];
    if (filter === "completed") return task.status.toLowerCase() === "complete";
    if (filter === "incomplete")
      return task.status.toLowerCase() !== "complete";
    if (filter === "today") return startedDate === today;
    return true;
  });

  const totalTasks = todos.length;
  const completedTasks = todos.filter(
    (t) => t.status.toLowerCase() === "complete"
  ).length;
  const incompleteTasks = todos.filter(
    (t) => t.status.toLowerCase() !== "complete"
  ).length;
  const todayTasks = todos.filter(
    (t) => new Date(t.startedAt).toISOString().split("T")[0] === today
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="container mx-auto p-4"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Welcome, {user?.fullname || "User"}</h2>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary"
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

      {/* Stats Section */}
      <div className="row text-center mb-4">
        <div className="col">
          <div className="p-3 bg-primary text-white rounded shadow">
            <strong>Total:</strong> {totalTasks}
          </div>
        </div>
        <div className="col">
          <div className="p-3 bg-success text-white rounded shadow">
            <strong>Completed:</strong> {completedTasks}
          </div>
        </div>
        <div className="col">
          <div className="p-3 bg-danger text-white rounded shadow">
            <strong>Incomplete:</strong> {incompleteTasks}
          </div>
        </div>
        <div className="col">
          <div className="p-3 bg-warning text-dark rounded shadow">
            <strong>Today:</strong> {todayTasks}
          </div>
        </div>
      </div>

      {/* Filter Dropdown */}
      <div className="text-center my-4">
        <div className="dropdown d-inline-block">
          <button
            className="btn btn-outline-secondary dropdown-toggle px-4 py-2"
            type="button"
            id="filterDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-filter me-2"></i>
            Filter: {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
          <ul
            className="dropdown-menu text-start"
            aria-labelledby="filterDropdown"
          >
            <li>
              <button
                className="dropdown-item text-dark fw-semibold"
                onClick={() => setFilter("all")}
              >
                <i className="fas fa-list me-2 text-secondary"></i>All
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-success fw-semibold"
                onClick={() => setFilter("completed")}
              >
                <i className="fas fa-check-circle me-2 text-success"></i>
                Completed
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-warning fw-semibold"
                onClick={() => setFilter("incomplete")}
              >
                <i className="fas fa-hourglass-half me-2 text-warning"></i>
                Incomplete
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-primary fw-semibold"
                onClick={() => setFilter("today")}
              >
                <i className="fas fa-calendar-day me-2 text-primary"></i>Today
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Task List */}
      <TodoList
        todos={filteredTodos}
        refreshTodos={fetchTodos}
        setEditTask={(task) => {
          setEditTask(task);
          setShowForm(true);
        }}
      />

      {/* Add/Edit Form Overlay */}
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
                fetchTodos();
                setShowForm(false);
              }}
              editTask={editTask}
              setEditTask={setEditTask}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;
