import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

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
 *
 * @param {ObjectId} examId
 */
export function useGetExam(examId) {
    const { _id: userId } = useSelector((state) => state.user);
    const [examData, setExamData] = useState();

    useEffect(() => {
        async function getExam(examId, userId) {
            await axios
                .get(`/api/exam/${examId}/${userId}`)
                .then((res) => {
                    console.log("[useGetExam]", res.data);
                    setExamData(res.data);
                })
                .catch((err) => {
                    console.error("[useGetExam]", err);
                });
        }

        if (!!examId) {
            getExam(examId, userId);
        }
    }, [examId, userId]);

    return { examData };
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

    return examDetails;
}

/**
 *
 * @param {Array[ObjectIds]} examIds
 * @returns {Array} examDetails
 */
export function usePopulatedExams(examIds) {
    const { _id: userId } = useSelector((state) => state.user);
    const [examDetails, setExamDetails] = useState([]);

    useEffect(() => {
        async function getPopulatedExamDetails(examId, userId) {
            await axios
                .get(`/api/exam/populate/${examId}/${userId}`)
                .then((res) => {
                    const data = res.data;
                    console.log("res", res.data);
                    console.log("usePopulatedExams", data);
                    setExamDetails((previous) => [...previous, data]);
                })
                .catch((err) =>
                    console.error("usePopulatedExams", err.message)
                );
        }
        console.log(
            "%cusePopulatedExams",
            "background-color:yellow; color:black"
        );
        if (!!userId && !!examIds) {
            examIds.map((examId) => {
                console.log(
                    `%c examId: ${examId} userId: ${userId}`,
                    "background-color: yellow; color: black"
                );
                getPopulatedExamDetails(examId, userId);
            });
        }
    }, [examIds, userId]);

    return examDetails;
}
