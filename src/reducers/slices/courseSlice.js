import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
    name: "course",
    initialState: { courses: [] },
    reducers: {
        setCourse: (state, { payload }) => {
            return { ...state, courses: payload };
        },
    },
});

export const { setCourse } = courseSlice.actions;
