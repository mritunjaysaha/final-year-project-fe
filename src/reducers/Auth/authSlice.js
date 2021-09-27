import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        _id: "",
        role: "",
    },
    reducers: {
        setAuth: (state, { payload }) => {
            return {
                ...state,
                isAuthenticated: !!payload._id,
                _id: payload._id,
            };
        },
    },
});

export const { setAuth } = authSlice.actions;
