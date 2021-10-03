import { createSlice } from "@reduxjs/toolkit";

export const examSlice = createSlice({
    name: "exam",
    initialState: {
        name: "",
        course: "",
        course_coordinator: "",
        questions: [],
        students: [],
        start_date: "",
        active_for: "",
        time_limit: "",
        total_marks: "",
    },
    reducers: {
        setExam: (state, { payload }) => {
            return { ...state, ...payload };
        },
    },
});

export const { setExam } = examSlice.actions;
