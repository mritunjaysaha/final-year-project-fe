import { useGetUser, useGetAllUsers } from "./user";
import {
    useGetAllQuestionsOfExam,
    useGetExam,
    useGetAllPopulatedExams,
    usePopulatedExams,
} from "./exam";
import {
    useGetPopulatedCourses,
    useGetEnrolledStudentsInCourse,
} from "./course";

export {
    useGetUser,
    useGetPopulatedCourses,
    useGetAllUsers,
    usePopulatedExams,
};
export { useGetAllQuestionsOfExam, useGetExam, useGetAllPopulatedExams };
export { useGetEnrolledStudentsInCourse };
