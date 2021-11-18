import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "../atoms/button";
import { ExamForm } from "./examForm";
import { ShowExams, ShowStudentExams } from "./showExam";

import { useGetUser } from "../../customHooks";
import { checkRole } from "../../utils";

import styles from "./exam.module.scss";

function InstructorExamPage() {
    const [isCreateExamClicked, setIsCreateExamClicked] = useState(false);

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

function StudentExamPage() {
    return (
        <section className={styles.examContainer}>
            <ShowStudentExams />
        </section>
    );
}

export function Exam() {
    useGetUser();

    const { role } = useSelector((state) => state.user);
    switch (checkRole(role)) {
        case "STUDENT":
            return <StudentExamPage />;
        case "INSTRUCTOR":
            return <InstructorExamPage />;
        default:
            return <></>;
    }
}
