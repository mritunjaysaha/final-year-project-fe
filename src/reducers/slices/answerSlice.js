import { createSlice } from "@reduxjs/toolkit";

export const answerSlice = createSlice({
    name: "answer",
    initialState: {},
    reducers: {
        setAnswer: (state, { payload }) => {
            return [...payload];
        },
    },
});

export const { setAnswer } = answerSlice.actions;
