import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, setCourse } from "../reducers/actions";
import { set, get } from "idb-keyval";

export function useGetUser() {
    const dispatch = useDispatch();

    const { _id: userId } = useSelector((state) => state.user);

    useEffect(
        function () {
            async function getUser(userId) {
                await axios
                    .get(`/api/user/${userId}`)
                    .then((res) => {
                        console.log(res.data);
                        set("user", res.data);
                        dispatch(setUserData(res.data));
                    })
                    .catch((err) => {
                        console.error("useGetUser", err.message);

                        get("user")
                            .then((data) => {
                                console.log(data);

                                dispatch(setUserData(data));
                            })
                            .catch((err) => console.log(err));
                    });
            }

            getUser(userId);
        },
        [userId, dispatch]
    );
}

export function useGetPopulatedCourses() {
    const { _id: userId, courses } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        async function getCourses(userId) {
            await axios
                .get(`/api/user/populated-courses/${userId}`)
                .then((res) => {
                    set("courses", res.data);

                    dispatch(setCourse(res.data));
                })
                .catch((err) => {
                    console.error("useGetPopulatedCourses", err.message);
                });
        }

        if (courses.length > 0) {
            getCourses(userId);
        }
    }, [userId, courses, dispatch]);
}

export function useGetAllUsers() {
    const { _id: userId } = useSelector((state) => state.user);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        async function getAllUsers(userId) {
            await axios
                .get(`/api/user/all/${userId}`)
                .then((res) => {
                    console.log("useGetAllUsers", res.data);
                    setAllUsers(res.data);
                })
                .catch((err) => {
                    console.log("useGetAllUsers", err.message);
                });
        }

        getAllUsers(userId);
    }, [userId]);

    return {
        allUsers,
    };
}
