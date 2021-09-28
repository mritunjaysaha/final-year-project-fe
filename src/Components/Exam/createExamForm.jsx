import axios from "axios";

import { Form } from "../Forms";
import { FormInput } from "../Forms/formInput";
import { Button } from "../atoms/button";

import styles from "./createExamForm.module.scss";

export function ExamForm() {
    const initialValues = {
        name: "Demo Exam",
        course: "614cc5c9456a3d4d0c3a9189",
        course_coordinator: "614cc588456a3d4d0c3a9185",
        time_limit: "3", // date or number type only -- cannot have 'hours' or other strings
        total_marks: "80",
    };

    async function handleSubmit(e, form) {
        e.preventDefault();

        await axios
            .post(
                `http://localhost:9000/api/exam/614cc588456a3d4d0c3a9185`,
                form
            )
            .then((res) => {
                console.log({ res });
            })
            .catch((err) => {
                console.log({ err });
            });
    }

    return (
        <section className={styles.examFormSection}>
            <Form initialValues={initialValues} submit={handleSubmit}>
                {/* <div className={styles.input}> */}
                <FormInput name="name" label="Title" />
                {/* </div> */}
                {/* make it a dropdown menu */}
                {/* <div className={styles.input}> */}
                <FormInput name="course" label="Course" />
                {/* </div> */}
                {/* <div className={styles.inputContainerFlex2}>
                    <div className={styles.input}> */}
                <FormInput name="time_limit" label="Duration" />
                {/* </div>
                    <div className={styles.input}> */}
                <FormInput
                    type="number"
                    name="total_marks"
                    label="Total Marks"
                />
                {/* </div>
                </div> */}
                {/* <div> */}
                <Button type="submit">Submit</Button>
                {/* </div> */}
            </Form>
        </section>
    );
}
