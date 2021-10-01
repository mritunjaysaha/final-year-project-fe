import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { setUserData } from "../../reducers/Auth/authSlice";

import { Button } from "../atoms/button";
import { ExamForm } from "./examForm";
import { QuestionForm } from "./questionForm";

import styles from "./exam.module.scss";

export function Exam() {
    const dispatch = useDispatch();

    const [isCreateExamClicked, setIsCreateExamClicked] = useState(false);
    const { _id: userId } = useSelector((state) => state.user);

    useEffect(
        function () {
            async function getUser(userId) {
                await axios
                    .get(`/api/user/${userId}`)
                    .then((res) => {
                        console.log(res.data);
                        dispatch(setUserData(res.data));
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }

            getUser(userId);
        },
        [userId, dispatch]
    );

    return (
        <section className={styles.examContainer}>
            <Button
                onClick={() => {
                    setIsCreateExamClicked(!isCreateExamClicked);
                }}
            >
                Create Exam
            </Button>

            {/* {isCreateExamClicked ? <ExamForm /> : ""} */}
            <ExamForm />
            <QuestionForm />
        </section>
    );
}
