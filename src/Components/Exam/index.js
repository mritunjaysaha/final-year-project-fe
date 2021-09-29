import { useState } from "react";

import { Button } from "../atoms/button";
import { ExamForm } from "./createExamForm";
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
        </section>
    );
}
