import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
    useGetAllQuestionsOfExam,
    useGetExam,
    useGetEnrolledStudentsInCourse,
    useGetAllPopulatedExams,
    usePopulatedExams,
} from "../../customHooks";
import { Form, FormInput, SelectInput } from "../Forms";
import { Button } from "../atoms/button";

import { QuestionForm } from "./questionForm";
import { ShowQuestions } from "./showQuestions";

import { updateExam } from "../../utils/updateRequests";
import { navLinks } from "../../utils/navlinks";

import styles from "./exam.module.scss";

/**
 *
 * @param {Array} examData
 * @returns {Element}
 */
function ExamCard({ examData }) {
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [showQuestions, setShowQuestions] = useState(false);

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
    const { students } = useGetEnrolledStudentsInCourse(course);

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
            .delete(`/api/exam/${examId}/${userId}`)
            .then((res) => {
                console.log("[showExam] deleteHandler", res.data);
            })
            .catch((err) => console.error("[showExam]", err.message));
    }

    async function enrollAllHandler() {
        console.log(`%c${JSON.stringify(students)}`, "background-color: blue");
        updateExam({ students }, examId, userId);
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
                            setShowQuestions(!showQuestions);
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
        </section>
    );
}

ExamCard.propTypes = {
    examData: PropTypes.array,
};

export function ShowExams() {
    const { exams, role } = useSelector((state) => state.user);

    console.log(
        `%cexams ${JSON.stringify(exams)}`,
        "background-color: yellow; color: black"
    );

    const examDetails = useGetAllPopulatedExams(exams);

    if (examDetails.length) {
        return (
            <>
                {examDetails.map((examData) => (
                    <ExamCard
                        key={examData._id}
                        examData={examData}
                        role={role}
                    />
                ))}
            </>
        );
    }

    return (
        <>
            {examDetails.length
                ? examDetails.map((examData) => (
                      <ExamCard key={examData._id} examData={examData} />
                  ))
                : ""}
        </>
    );
}
function StudentExamCard({ examData }) {
    const history = useHistory();
    const {
        _id: examId,
        name,
        course,
        course_coordinator,
        time_limit,
        total_marks,
        active_for,
    } = examData;
    const { course_name } = course;
    const { first_name, last_name } = course_coordinator;

    function attemptHandler() {
        console.log(
            "%c[attemptHandler] clicked",
            "background-color: red; color: white; font-weight: bold"
        );
        history.push(`${navLinks.attempt}/${examId}`);
    }
    return (
        <article className={styles.studentExamCard}>
            <p>{name}</p>
            <p>{course_name}</p>
            <p>
                {first_name} {last_name}
            </p>
            <p>{time_limit}</p>
            <p>{total_marks}</p>
            <p>{active_for}</p>

            <Button onClick={attemptHandler}>Attempt</Button>
        </article>
    );
}

StudentExamCard.propTypes = {
    examData: PropTypes.object.isRequired,
};

export function ShowStudentExams() {
    const { exams } = useSelector((state) => state.user);

    const examDetails = usePopulatedExams(exams);

    return (
        <>
            {examDetails.length
                ? examDetails.map((examData) => (
                      <StudentExamCard key={examData._id} examData={examData} />
                  ))
                : ""}
        </>
    );
}
