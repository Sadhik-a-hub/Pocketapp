import axios from "axios";

const BASE_URL = "http://localhost:3000/api/mypocket";
const TODO_URL = "http://localhost:3000/api/todos";

const registerUser = async (userData) => {
  return await axios.post(`${BASE_URL}/register`, userData);
};

const loginUser = async (userData) => {
  return await axios.post(`${BASE_URL}/login`, userData);
};

const createTodo = async (todoData) => {
  const token = localStorage.getItem("token");
  return await axios.post(`${TODO_URL}/create`, todoData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getTodos = async () => {
  const token = localStorage.getItem("token");
  return await axios.get(`${TODO_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteTodo = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.delete(`${TODO_URL}/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateTodo = async (id, updatedData) => {
  const token = localStorage.getItem("token");
  return await axios.put(`${TODO_URL}/update/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const forgotPassword = async (email) => {
  return await axios.post(`${BASE_URL}/forgot-password`, { email });
};

export {
  registerUser,
  loginUser,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  forgotPassword,
};
