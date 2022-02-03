import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { set, get } from "idb-keyval";

import { setExam } from "../reducers/slices/examSlice";
import { INDEX_DB_VARIABLES } from "../utils";

/**
 * Get all questions for the examId
 * @param {ObjectId} examId
 */
export function useGetAllQuestionsOfExam(examId) {
    const { _id: userId } = useSelector((state) => state.user);
    const [questions, setQuestions] = useState([]);

    console.log("useGetAllQuestionsOfExam", { examId, userId });

    useEffect(() => {
        async function getAllQuestions(userId, examId) {
            await axios
                .get(`/api/exam/all-questions/${examId}/${userId}`)
                .then((res) => {
                    console.log("useGetAllQuestionsOfExam", res.data);
                    setQuestions(res.data);
                })
                .catch((err) => {
                    console.error("useGetAllQuestionsOfExam", err.message);
                });
        }

        if (!examId) {
            console.log("No examId");
        } else {
            getAllQuestions(userId, examId);
        }
    }, [userId, examId]);

    return { questions };
}

/**
 * Returns the data of single exam
 */
export function useGetExam(examId) {
    const { _id: userId } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        async function getExam(examId, userId) {
            await axios
                .get(`/api/exam/${examId}/${userId}`)
                .then((res) => {
                    dispatch(setExam(res.data));
                    set(INDEX_DB_VARIABLES.exam, res.data);
                })
                .catch((err) => {
                    console.error("[useGetExam]", err);

                    get(INDEX_DB_VARIABLES.exam)
                        .then((data) => {
                            console.log("[useGetExam]", data);
                        })
                        .catch((err) =>
                            console.error("[useGetExam]", err.message)
                        );
                });
        }

        if (!!examId) {
            getExam(examId, userId);
        }
    }, [examId, userId, dispatch]);
}

/**
 * Fetches the exam details for all the examIds
 * @param {Array[ObjectIds]} examIds
 * @returns {Array} examDetails
 */
export function useGetAllPopulatedExams(examIds) {
    const { _id: userId } = useSelector((state) => state.user);
    const [examDetails, setExamDetails] = useState([]);

    useEffect(() => {
        async function getExamDetails(examId, userId) {
            await axios
                .get(`/api/exam/${examId}/${userId}`)
                .then((res) => {
                    const data = res.data;
                    console.log("useGetAllPopulatedExams", data);
                    setExamDetails((previous) => [...previous, data]);
                })
                .catch((err) =>
                    console.error("useGetAllPopulatedExams", err.message)
                );
        }

        if (userId && examIds) {
            examIds.map((examId) => getExamDetails(examId, userId));
        }
    }, [userId, examIds]);
}

/**
 *
 * @param {ObjectIds[]} examIds
 */
export function useGetPopulatedExams() {
    const { _id: userId, exams } = useSelector((state) => state.user);
    const [examDetails, setExamDetails] = useState([]);
    const dispatch = useDispatch();

    console.log("[usePopulatedExams]", exams);

    useEffect(() => {
        async function getPopulatedExamDetails(examId, userId) {
            await axios
                .get(`/api/exam/populate/${examId}/${userId}`)
                .then((res) => {
                    console.log("[useGetPopulatedExams]", res.data);
                    setExamDetails((previous) => [...previous, res.data]);

                    dispatch(setExam(res.data));
                })
                .catch((err) => {
                    console.error("usePopulatedExams", err.message);

                    get(INDEX_DB_VARIABLES.exam)
                        .then((data) => {
                            console.log("[useGetPopulatedExams]", data[0]);
                            dispatch(setExam(data[0]));
                        })
                        .catch((err) =>
                            console.error(
                                "[usePopulatedExams] idb error",
                                err.message
                            )
                        );
                });
        }
        console.log(
            "%cusePopulatedExams",
            "background-color:yellow; color:black"
        );
        if (!!userId && !!exams) {
            exams.map((examId) => {
                console.log(
                    `%c examId: ${examId} userId: ${userId}`,
                    "background-color: yellow; color: black"
                );
                getPopulatedExamDetails(examId, userId);
            });
        }
    }, [exams, userId, dispatch]);

    useEffect(() => {
        console.log(examDetails);
        if (!examDetails.length) {
            return;
        }
        set(INDEX_DB_VARIABLES.exam, examDetails);
    }, [examDetails]);
}
