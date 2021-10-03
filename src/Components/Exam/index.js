import { useState } from "react";

import { Button } from "../atoms/button";
import { ExamForm } from "./examForm";
import { QuestionForm } from "./questionForm";

import { useGetUser, useGetAllQuestionsOfExam } from "../../customHooks";

import styles from "./exam.module.scss";

export function Exam() {
    const [isCreateExamClicked, setIsCreateExamClicked] = useState(false);

    useGetUser();
    useGetAllQuestionsOfExam("61576b077a5c500d144dfa1b");

    return (
        <section className={styles.examContainer}>
            <Button
                onClick={() => {
                    setIsCreateExamClicked(!isCreateExamClicked);
                }}
            >
                Create Exam
            </Button>

            {isCreateExamClicked ? <ExamForm /> : ""}

            {/* display the created questions of the user */}
        </section>
    );
}
