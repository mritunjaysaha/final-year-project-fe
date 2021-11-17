import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { set, get } from "idb-keyval";

import { INDEX_DB_VARIABLES } from "../utils";
import { setCourse } from "../reducers/actions";

export function useGetEnrolledStudentsInCourse(courseId) {
    const { _id: userId } = useSelector((state) => state.user);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function getAllEnrolledStudentsInCourse(courseId) {
            console.log(`course ${courseId}`);
            await axios
                .get(`/api/course/${courseId}/${userId}`)
                .then((res) => {
                    console.log(
                        "useGetEnrolledStudentsInCourse courses",
                        res.data.students
                    );
                    setStudents(res.data.students);
                })
                .catch((err) =>
                    console.error(
                        "useGetEnrolledStudentsInCourse courses",
                        err.message
                    )
                );
        }

        if (courseId && userId) {
            getAllEnrolledStudentsInCourse(courseId);
        }
    }, [courseId, userId]);

    return { students };
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

                            dispatch(setCourse(data));
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
