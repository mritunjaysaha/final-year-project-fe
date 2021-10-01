import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "../atoms/button";
import { ExamForm } from "./examForm";
import { QuestionForm } from "./questionForm";

import styles from "./exam.module.scss";

export function Exam() {
    const [isCreateExamClicked, setIsCreateExamClicked] = useState(false);
    const { _id: userId } = useSelector((state) => state.user);

    console.log({ userId });

    useEffect(() => {}, []);

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
