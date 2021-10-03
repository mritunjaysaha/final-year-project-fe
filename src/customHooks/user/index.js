import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserData, setCourse } from "../../reducers/actions";

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
                        dispatch(setUserData(res.data));
                    })
                    .catch((err) => {
                        console.error("useGetUser", err.message);
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
                    console.log(res.data);
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
