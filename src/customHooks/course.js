import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function useGetEnrolledStudentsInCourse(courseId) {
    const { _id: userId } = useSelector((state) => state.user);

    useEffect(() => {
        async function getAllEnrolledStudentsInCourse(courseId) {
            console.log(`%c course ${courseId}`);
            await axios
                .get(`/api/course/${courseId}/${userId}`)
                .then((res) => {
                    console.log("courses", res.data);
                })
                .catch((err) => console.error("courses", err.message));
        }

        if (courseId && userId) {
            getAllEnrolledStudentsInCourse(courseId);
        }
    }, [courseId, userId]);
}
