import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

/**
 *
 * @param {ObjectId} examId
 */
export function useGetAllQuestionsOfExam(examId) {
    const { _id: userId } = useSelector((state) => state.user);

    useEffect(() => {
        async function getAllQuestions(userId, examId) {
            await axios
                .get(`/api/exam/all-question/${examId}/${userId}`)
                .then((res) => {
                    console.log("useGetAllQuestionsOfExam", res.data);
                })
                .catch((err) => {
                    console.error("useGetAllQuestionsOfExam", err.message);
                });
        }

        getAllQuestions(userId, examId);
    }, [userId, examId]);
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
                    console.log(res.data);
                    setExamData((examData) => res.data);
                })
                .catch((err) => {
                    console.error("useGetExam", err);
                });
        }

        if (!!examId) {
            getExam(examId, userId);
        } else {
            console.log("empty");
        }
    }, [examId, userId]);

    return { examData };
}