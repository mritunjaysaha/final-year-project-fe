import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { setAnswer } from "../reducers/actions";

export function useGetAllAnswerScripts(examId) {
    const { _id: userId } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        async function getAnswers() {
            await axios
                .get(`/api/exam/all-answers/${examId}/${userId}`)
                .then((res) => {
                    console.log("[useGetAllAnswerScripts]", { res });
                    dispatch(setAnswer(res.data));
                })
                .catch((err) =>
                    console.error("[useGetAllAnswerScripts]", err.message)
                );
        }

        getAnswers();
    }, [userId, examId, dispatch]);
}
