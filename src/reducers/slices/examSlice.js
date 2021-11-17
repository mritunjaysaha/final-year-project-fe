import { createSlice } from "@reduxjs/toolkit";

export const examSlice = createSlice({
    name: "exam",
    initialState: {
        exams: [],
    },
    reducers: {
        setExam: (state, { payload }) => {
            return { exams: [payload, ...state.exams] };
        },
    },
});

export const { setExam, setQuestions } = examSlice.actions;
