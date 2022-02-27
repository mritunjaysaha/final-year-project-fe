import { createSlice } from "@reduxjs/toolkit";

export const examSlice = createSlice({
    name: "exam",
    initialState: {
        exams: [],
    },
    reducers: {
        setExam: (state, { payload }) => {
            // TODO: remove the spread operator
            return { exams: [payload, ...state.exams] };
        },
    },
});

export const { setExam } = examSlice.actions;
