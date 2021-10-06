import { useState } from "react";

import { Button } from "../atoms/button";
import { ExamForm } from "./examForm";
import { ShowExams } from "./showExam";

import { useGetUser } from "../../customHooks";

import styles from "./exam.module.scss";

export function Exam() {
    const [isCreateExamClicked, setIsCreateExamClicked] = useState(false);

    useGetUser();

    return (
        <section className={styles.examContainer}>
            <Button
                onClick={() => {
                    setIsCreateExamClicked(true);
                }}
            >
                Create Exam
            </Button>

            {isCreateExamClicked ? (
                <ExamForm
                    formCloseHandler={() => {
                        setIsCreateExamClicked(false);
                    }}
                />
            ) : (
                ""
            )}

            {/* display the created questions of the user */}
            <ShowExams />
        </section>
    );
}
