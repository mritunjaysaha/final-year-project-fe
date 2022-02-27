import { configureStore } from "@reduxjs/toolkit";
import { authSlice, examSlice, courseSlice, answerSlice } from "../reducers";

export const store = configureStore({
    reducer: {
        user: authSlice.reducer,
        exam: examSlice.reducer,
        course: courseSlice.reducer,
        answer: answerSlice.reducer,
    },
});
