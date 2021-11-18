import { useGetUser, useGetPopulatedCourses, useGetAllUsers } from "./user";
import {
    useGetAllQuestionsOfExam,
    useGetExam,
    useGetAllPopulatedExams,
} from "./exam";
import { useGetEnrolledStudentsInCourse } from "./course";

export { useGetUser, useGetPopulatedCourses, useGetAllUsers };
export { useGetAllQuestionsOfExam, useGetExam, useGetAllPopulatedExams };
export { useGetEnrolledStudentsInCourse };
