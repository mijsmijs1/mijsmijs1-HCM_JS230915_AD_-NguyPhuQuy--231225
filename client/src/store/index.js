import { todoListReducer } from "./slices/todoList.slice";
import { userReducer } from "./slices/user.slice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        todoListStore: todoListReducer,
        userStore: userReducer
    }
})