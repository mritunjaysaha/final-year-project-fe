import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useGetExam } from "../../customHooks";
import { Form, FormInput, SelectInput } from "../Forms";
import { Button } from "../atoms/button";

import styles from "./exam.module.scss";
import { QuestionForm } from "./questionForm";

function ExamCard({ examId }) {
    const [showQuesitonForm, setShowQuestionForm] = useState();

    const { examData } = useGetExam(examId);
    const { _id: userId } = useSelector((state) => state.user);

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

    if (!!examData) {
        return (
            <section>
                <Form initialValues={initialValues} submit={submitHandler}>
                    <div className={styles.input}>
                        <FormInput name="name" label="Title" />
                    </div>
                    <div className={styles.input}>
                        {/* <SelectInput
                            name="course"
                            label="Course"
                            options={options}
                        /> */}
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

                <div>
                    <Button
                        onClick={() => {
                            setShowQuestionForm(true);
                        }}
                    >
                        Add Questions
                    </Button>
                </div>
                {showQuesitonForm ? <QuestionForm /> : ""}
                {/* display questions with the option to update questions */}
            </section>
        );
    }

    return <></>;
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
