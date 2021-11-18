import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
