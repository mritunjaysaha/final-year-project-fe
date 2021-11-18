import { configureStore } from "@reduxjs/toolkit";
import { authSlice, examSlice, courseSlice } from "../reducers";

export const store = configureStore({
    reducer: {
        user: authSlice.reducer,
        exam: examSlice.reducer,
        course: courseSlice.reducer,
    },
});
