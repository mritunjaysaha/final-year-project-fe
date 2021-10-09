import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetAllQuestionsOfExam, useGetExam } from "../../customHooks";
import { Form, FormInput, SelectInput } from "../Forms";
import { Button } from "../atoms/button";

import styles from "./exam.module.scss";
import { QuestionForm } from "./questionForm";
import { ShowQuestions } from "./showQuestions";

function ExamCard({ examId }) {
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [showQuestions, setShowQuestions] = useState(false);

    const { examData } = useGetExam(examId);
    const { _id: userId } = useSelector((state) => state.user);

    const { questions } = useGetAllQuestionsOfExam(examId);

    if (!examData) {
        return <></>;
    }

    const { name, course, time_limit, total_marks, start_date, active_for } =
        examData;

    const initialValues = {
        name,
        course,
        time_limit,
        total_marks,
        active_for,
        start_date,
    };

    async function submitHandler(form, event) {
        event.preventDefault();
        await axios
            .put(`/api/exam/${examId}/${userId}`, form)
            .then((res) => {
                console.log("[ExamCard][submitHandler]", res.data);
            })
            .catch((err) => {
                console.error("[ExamCard][submitHandler]", err.message);
            });
    }

    async function deleteHandler() {
        await axios
            .delete()
            .then((res) => {
                console.log("[showExam] deleteHandler", res.data);
            })
            .catch((err) => console.error("[showExam]", err.message));
    }

    return (
        <section className={styles.examCardSection}>
            <Form initialValues={initialValues} submit={submitHandler}>
                <div className={styles.input}>
                    <FormInput name="name" label="Title" />
                </div>
                <div className={styles.input}>
                    <SelectInput
                        name="course"
                        label="Course"
                        // options={options}
                    />
                </div>
                <div className={styles.inputContainerFlex2}>
                    <div className={styles.input}>
                        {/* <MUIDateAndTimePicker label="Date and Time" /> */}
                    </div>
                    <div className={styles.input}>
                        <FormInput
                            name="time_limit"
                            label="Duration (in hours)"
                        />
                    </div>
                    <div className={styles.input}>
                        <FormInput
                            type="number"
                            name="total_marks"
                            label="Total Marks"
                        />
                    </div>
                </div>
                <div>
                    <Button type="submit">Update</Button>
                </div>
            </Form>

            <div className={styles.examCardButtonsContainer}>
                <div>
                    <Button
                        onClick={() => {
                            setShowQuestionForm(true);
                        }}
                    >
                        Add Questions
                    </Button>
                    <Button
                        onClick={() => {
                            setShowQuestions(!showQuestions);
                        }}
                    >
                        Show Questions
                    </Button>
                </div>
                <Button onClick={deleteHandler}>Delete Exam</Button>
            </div>
            {showQuestionForm ? <QuestionForm /> : ""}
            {/* display questions with the option to update questions */}

            {showQuestions ? <ShowQuestions questions={questions} /> : ""}
        </section>
    );
}

export function ShowExams() {
    const { exams, _id: userId } = useSelector((state) => state.user);
    console.log(exams);

    if (exams.length <= 0) {
        return <></>;
    }
    return (
        <>
            {exams.map((examId) => (
                <ExamCard key={examId} examId={examId} userId={userId} />
            ))}
        </>
    );
}
