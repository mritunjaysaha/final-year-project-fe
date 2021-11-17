import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, setCourse } from "../reducers/actions";
import { set, get } from "idb-keyval";
import { INDEX_DB_VARIABLES } from "../utils";

export function useGetUser() {
    const dispatch = useDispatch();

    const { _id: userId } = useSelector((state) => state.user);

    useEffect(
        function () {
            async function getUser(userId) {
                await axios
                    .get(`/api/user/${userId}`)
                    .then((res) => {
                        set(INDEX_DB_VARIABLES.user, res.data);
                        dispatch(setUserData(res.data));
                    })
                    .catch((err) => {
                        console.error("useGetUser", err.message);

                        get(INDEX_DB_VARIABLES.user)
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
        /**
         *  fetch the data from the backend.
         *  If offline or error, then fetch the data from indexDB
         * @param {String} userId -- MongoDB object Id
         */
        async function getCourses(userId) {
            await axios
                .get(`/api/user/populated-courses/${userId}`)
                .then((res) => {
                    dispatch(setCourse(res.data));
                    set(INDEX_DB_VARIABLES.course, res.data);
                })
                .catch((err) => {
                    console.error("useGetPopulatedCourses", err.message);

                    get(INDEX_DB_VARIABLES.course)
                        .then((data) => {
                            console.log("course", data);
                        })
                        .catch((err) => {
                            console.error(
                                "useGetPopulatedCourses",
                                err.message
                            );
                        });
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
