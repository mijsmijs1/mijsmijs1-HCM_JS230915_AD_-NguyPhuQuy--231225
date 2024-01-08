import { createSlice } from "@reduxjs/toolkit";

export const todoListSlice = createSlice({
    name: "todoList",
    initialState: {
        data: null,
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        create: (state, action) => {
            state.data.push(action.payload);
        },
        update: (state, action) => {
            state.data = state.data.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                } else {
                    return item;
                }
            });
        },
        delete: (state, action) => {
            state.data = state.data.filter((item) => item.id !== action.payload);
        }
    },
});

export const todoListAction = todoListSlice.actions;
export const todoListReducer = todoListSlice.reducer;