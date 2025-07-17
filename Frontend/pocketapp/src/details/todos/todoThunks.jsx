import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../../service/api";

// Fetch Todos Thunk
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, thunkAPI) => {
    try {
      const res = await getTodos();
      return res.data.tasks;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Add Todo Thunk
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (data, thunkAPI) => {
    try {
      const res = await createTodo(data);
      return res.data.task;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Edit Todo Thunk
export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await updateTodo(id, data);
      return res.data.task;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// Remove Todo Thunk
export const removeTodo = createAsyncThunk(
  "todos/removeTodo",
  async (id, thunkAPI) => {
    try {
      await deleteTodo(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
