import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../reducers/Auth/authSlice";

export const store = configureStore({
    reducer: {
        user: authSlice.reducer,
    },
});
