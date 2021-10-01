import axios from "axios";
import { useSelector } from "react-redux";

import { Form } from "../Forms";
import { FormInput } from "../Forms/formInput";
import { Button } from "../atoms/button";
import { MUIDateAndTimePicker } from "../DateAndTime";

import styles from "./exam.module.scss";

export function ExamForm() {
    const { _id: userId } = useSelector((state) => state.user);
    const initialValues = {
        name: "Demo Exam",
        course: "614cc5c9456a3d4d0c3a9189",
        course_coordinator: userId,
        time_limit: "3", // date or number type only -- cannot have 'hours' or other strings
        total_marks: "80",
        start_date: Date.now(),
        active_for: Date.now(),
    };

    async function handleSubmit(e, form) {
        e.preventDefault();

        console.log({ form });

        await axios
            .post(`/api/exam/${userId}`, form)
            .then((res) => {
                console.log({ res });
            })
            .catch((err) => {
                console.log({ err });
            });
    }

    return (
        <section className={styles.formSection}>
            <Form initialValues={initialValues} submit={handleSubmit}>
                <div className={styles.input}>
                    <FormInput name="name" label="Title" />
                </div>
                {/* make it a dropdown menu */}
                <div className={styles.input}>
                    <FormInput name="course" label="Course" />
                </div>
                <div className={styles.inputContainerFlex2}>
                    <div className={styles.input}>
                        <MUIDateAndTimePicker label="Date and Time" />
                    </div>
                    <div className={styles.input}>
                        <FormInput name="time_limit" label="Duration" />
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
                    <Button type="submit">Submit</Button>
                </div>
            </Form>
        </section>
    );
}
