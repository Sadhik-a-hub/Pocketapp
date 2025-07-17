
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../details/auth/authSlice";
import todoReducer from "../details/todos/todoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer, 
  },
});

export default store;
