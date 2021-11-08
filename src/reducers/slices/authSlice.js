import { createSlice } from "@reduxjs/toolkit";
import { get } from "idb-keyval";

export const authSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        _id: "",
        role: "",
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        courses: [],
        exams: [],
        photo: "",
    },
    reducers: {
        setAuth: (state, { payload }) => {
            return {
                ...state,
                isAuthenticated: !!payload._id,
                _id: payload._id,
            };
        },

        setUserData: (state, { payload }) => {
            if (!payload) {
                get("user")
                    .then((val) => {
                        console.log("offline -- setUserData", val);
                        return { ...state, ...val };
                    })
                    .catch((err) => {
                        console.log("offline --setUserData", err);
                    });
            }
            return { ...state, ...payload };
        },
    },
});

export const { setAuth, setUserData } = authSlice.actions;
