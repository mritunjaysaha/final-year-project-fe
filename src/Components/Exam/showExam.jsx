import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Form, FormInput, SelectInput } from "../Forms";
import { Button } from "../atoms/button";

import { QuestionForm } from "./questionForm";
import { ShowQuestions } from "./showQuestions";

import { updateExam } from "../../utils/updateRequests";
import { navLinks } from "../../utils/navlinks";

import styles from "./exam.module.scss";

/**
 *
 * @param {String[]} examData
 * @returns {Element}
 */
function ExamCard({ examData }) {
    const navigate = useNavigate();

    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [showQuestions, setShowQuestions] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);

    const [questionsAdded, setQuestionsAdded] = useState(0); // TODO: 

    const { _id: userId } = useSelector((state) => state.user);
    const {
        _id: examId,
        name,
        course,
        time_limit,
        total_marks,
        start_date,
        active_for,
        students,
        questions,
        total_questions,
    } = examData;

    const initialValues = {
        name,
        course,
        time_limit,
        total_marks,
        active_for,
        start_date,
        total_questions,
    };

    useEffect(() => {
        // Update the questions length
        setQuestionsAdded(questions.length);
    }, [questions]);

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
                /**
                 * TODO: Update the deleted exam from the IndexDB and redux store
                 */
            })
            .catch((err) => console.error("[showExam]", err.message));
    }

    async function enrollAllHandler() {
        console.log(
            `%c [Enroll All Handler] ${JSON.stringify(students)}`,
            "background-color: blue"
        );
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

                    <div className={styles.input}>
                        <FormInput
                            type="number"
                            name="total_questions"
                            label="Total Questions"
                        />
                    </div>
                </div>
                <div>
                    <Button type="submit">Update</Button>

                    <Button
                        onClick={() => {
                            navigate(`${navLinks.evaluatePage}/${examId}`);
                        }}
                    >
                        {" "}
                        Evaluate Answers{" "}
                    </Button>
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
                    <Button
                        onClick={() => {
                            setShowAnswers(!showAnswers);
                        }}
                    >
                        Show Answers
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

            {/* Display the answers submitted by the students */}
            {/* {showAnswers ? ()} */}
        </section>
    );
}

ExamCard.propTypes = {
    examData: PropTypes.array,
};

export function ShowExams() {
    const { exams } = useSelector((state) => state.exam);
    console.log(
        `%cexams ${JSON.stringify(exams)}`,
        "background-color: yellow; color: black"
    );

    return (
        <>
            {console.log("Exam length: ", exams.length)}
            {!!exams.length
                ? exams.map((exam) => {
                      console.log("exam", exam);

                      const examData = {
                          ...exam,
                          course: exam.course.course_name,
                          students: exam.course.students,
                      };

                      return <ExamCard key={exam._id} examData={examData} />;
                  })
                : ""}

            {/* <div>{JSON.stringify(exams)}</div> */}
            {/* Exam Page */}
        </>
    );
}
function StudentExamCard({ examData }) {
    const navigate = useNavigate();
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
        navigate(`${navLinks.attempt}/${examId}`, {
            state: { examId: examId },
        });
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
    const { exams } = useSelector((state) => state.exam);

    return (
        <>
            {exams.length
                ? exams.map((examData) => (
                      <StudentExamCard key={examData._id} examData={examData} />
                  ))
                : ""}
        </>
    );
}
