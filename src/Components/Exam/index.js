import { useState } from "react";

import { Button } from "../atoms/button";
import { ExamForm } from "./examForm";
import { QuestionForm } from "./questionForm";

import styles from "./exam.module.scss";

export function Exam() {
    const [isCreateExamClicked, setIsCreateExamClicked] = useState(false);

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
