import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, forgotPassword } from "../../Screens/api";

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await loginUser(data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await registerUser(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  "auth/forgotPassword",
  async (data, thunkAPI) => {
    try {
      const res = await forgotPassword(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);
