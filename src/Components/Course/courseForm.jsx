import axios from "axios";
import { useSelector } from "react-redux";

import { Form } from "../Forms";
import { FormInput } from "../Forms";
import { Button } from "../atoms/button";

import styles from "./course.module.scss";

export function CourseForm() {
    const { _id: userId } = useSelector((state) => state.user);

    const initialValues = {
        course_name: "Demo Course",
        course_coordinator: userId,
    };

    const keys = Object.keys(initialValues);

    async function handleSubmit(e, form) {
        e.preventDefault();

        await axios
            .post(`/api/course/${userId}`, form)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <section className={styles.formSection}>
            <Form initialValues={initialValues} submit={handleSubmit}>
                <div className={styles.input}>
                    <FormInput
                        id={keys[0]}
                        name={keys[0]}
                        label="Course Title"
                        aria-label="Course Title"
                        aria-required="true"
                    />
                </div>

                {/* TODO: Add something to enrol students in the course */}

                <Button type="submit" aria-label="submit">
                    Submit
                </Button>
            </Form>
        </section>
    );
}
