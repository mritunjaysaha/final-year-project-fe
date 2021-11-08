import { createSlice } from "@reduxjs/toolkit";
import { get, set } from "idb-keyval";

export const courseSlice = createSlice({
    name: "course",
    initialState: {
        courses: [],
    },
    reducers: {
        setCourse: (state, { payload }) => {
            if (!payload) {
                get("courses").then((val) => {
                    console.log("offline -- courseSlice", { val });
                    return { courses: val };
                });
            }
            return { courses: payload };
        },
    },
});

export const { setCourse } = courseSlice.actions;
