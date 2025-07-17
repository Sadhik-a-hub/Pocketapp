// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Automatically add token to headers if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const registerUser = (data) => API.post("/mypocket/register", data);
export const loginUser = (data) => API.post("/mypocket/login", data);
export const forgotPassword = (data) =>
  API.post("/mypocket/forgot-password", data);
export const uploadAadhaar = (file) => {
  const formData = new FormData();
  formData.append("aadhaar", file);
  return API.post("/mypocket/upload-aadhaar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};


export const createTodo = (data) => API.post("/todos/create", data);
export const getTodos = () => API.get("/todos/all");
export const updateTodo = (id, data) => API.put(`/todos/update/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todos/delete/${id}`);
