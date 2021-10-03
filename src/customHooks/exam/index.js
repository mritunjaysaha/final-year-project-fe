import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export function useGetAllQuestionsOfExam(examId) {
    const { _id: userId } = useSelector((state) => state.user);

    useEffect(() => {
        async function getAllQuestions(userId) {
            await axios
                .get(`/api/exam/all-question/${examId}/${userId}`)
                .then((res) => {
                    console.log("useGetAllQuestionsOfExam", res.data);
                })
                .catch((err) => {
                    console.error("useGetAllQuestionsOfExam", err.message);
                });
        }

        getAllQuestions(userId);
    }, [userId, examId]);
}
