import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../details/todos/todoSlice";
import authReducer from "../details/auth/authSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer,
  },
});
