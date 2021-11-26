import { useGetUser, useGetAllUsers } from "./user";
import {
    useGetAllQuestionsOfExam,
    useGetExam,
    useGetAllPopulatedExams,
    useGetPopulatedExams,
} from "./exam";
import {
    useGetPopulatedCourses,
    useGetEnrolledStudentsInCourse,
} from "./course";

import { useScheduleRequests } from "./scheduleRequests";

export {
    useGetUser,
    useGetPopulatedCourses,
    useGetAllUsers,
    useGetPopulatedExams,
};
export { useGetAllQuestionsOfExam, useGetExam, useGetAllPopulatedExams };
export { useGetEnrolledStudentsInCourse };
export { useScheduleRequests };
