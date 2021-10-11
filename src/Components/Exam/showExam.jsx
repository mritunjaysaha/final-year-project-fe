import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
    useGetAllQuestionsOfExam,
    useGetExam,
    useGetEnrolledStudentsInCourse,
    useGetAllPopulatedExams,
} from "../../customHooks";
import { Form, FormInput, SelectInput } from "../Forms";
import { Button } from "../atoms/button";

import styles from "./exam.module.scss";
import { QuestionForm } from "./questionForm";
import { ShowQuestions } from "./showQuestions";

function ExamCard({ examData }) {
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [showQuestions, setShowQuestions] = useState(false);
    const [students, setStudents] = useState([]);

    console.log("[Exam Card]", examData);

    const { _id: userId } = useSelector((state) => state.user);

    const {
        _id: examId,
        name,
        course,
        time_limit,
        total_marks,
        start_date,
        active_for,
    } = examData;

    const { questions } = useGetAllQuestionsOfExam(examId);

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
                setStudents(res.data);
            })
            .catch((err) => {
                console.error("[ExamCard][submitHandler]", err.message);
            });
    }

    async function deleteHandler() {
        await axios
            .delete(`/api/exam/${examId}/${userId}`)
            .then((res) => {
                console.log("[showExam] deleteHandler", res.data);
            })
            .catch((err) => console.error("[showExam]", err.message));
    }

    async function getAllEnrolledStudentsInCourse(courseId) {
        console.log(`%c course ${courseId}`);
        console.log(courseId, userId);
        await axios
            .get(`/api/course/${courseId}/${userId}`)
            .then((res) => console.log("courses", res.data))
            .catch((err) => console.error("courses", err.message));
    }

    async function enrollAllHandler() {
        const promise = new Promise((resolve, reject) => {
            resolve(getAllEnrolledStudentsInCourse(initialValues.course));
        });

        promise
            .then((res) => {
                console.log("enrollAllHandler", res);
            })
            .catch((err) => console.error("enrollAllHandler", err));
    }

    return (
        <section className={styles.examCardSection}>
            <Form initialValues={initialValues} submit={submitHandler}>
                <div className={styles.input}>
                    <FormInput name="name" label="Title" />
                </div>
                <div>
                    <p>{initialValues.course}</p>
                </div>

                <div className={styles.inputContainerFlex2}>
                    <div className={styles.input}>
                        {/* TODO: Add update option for Date and time */}
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

            <div className={styles.buttonsContainer}>
                <div>
                    <Button onClick={enrollAllHandler}>
                        Enroll All Students
                    </Button>
                    <Button
                        onClick={() => {
                            setShowQuestionForm(true);
                        }}
                    >
                        Add Questions
                    </Button>
                    <Button
                        onClick={() => {
                            setShowQuestions(true);
                        }}
                    >
                        Show Questions
                    </Button>
                </div>
                <Button onClick={deleteHandler}>Delete Exam</Button>
            </div>
            {/*TODO: Show Success or error messages */}

            {showQuestionForm ? (
                <QuestionForm
                    examId={examId}
                    formCloseHandler={() => {
                        setShowQuestionForm(false);
                    }}
                />
            ) : (
                ""
            )}

            {/* display questions with the option to update questions */}

            {showQuestions ? (
                <ShowQuestions questions={questions} examId={examId} />
            ) : (
                ""
            )}

            <ShowQuestions questions={questions} />
        </section>
    );
}

ExamCard.propTypes = {
    examData: PropTypes.array,
};

export function ShowExams() {
    const { exams } = useSelector((state) => state.user);

    console.log(
        `%cexams ${JSON.stringify(exams)}`,
        "background-color: yellow; color: black"
    );

    const examDetails = useGetAllPopulatedExams(exams);
    console.log({ examDetails });
    if (examDetails.length) {
        return (
            <>
                {examDetails.map((examData) => (
                    <ExamCard key={examData._id} examData={examData} />
                ))}
            </>
        );
    }

    return <></>;
}
