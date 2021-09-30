import axios from "axios";
import { Button } from "../atoms/button";
import { Form } from "../Forms";
import { FormInput, FormTextarea } from "../Forms";

import styles from "./exam.module.scss";

export function QuestionForm() {
    const examId = "61536337446e2b0874c883a0";
    const userId = "614cc588456a3d4d0c3a9185";
    const questionId = "615496b9e7d6e054d0704141";
    const id = true;

    const initialValues = {
        name: "questions",
        marks: 3,
        exam: examId,
        course_coordinator: userId,
    };

    async function handleSubmit(e, form) {
        e.preventDefault();
        console.log(form);

        await axios
            .post(`/api/question/${examId}/${userId}`, form)
            .then((res) => {
                console.log("question", res);
            })
            .catch((err) => {
                console.log("question", err.message);
            });
    }

    async function handleUpdate(e, form) {
        e.preventDefault();

        const updateData = { name: form.name, marks: form.marks };

        console.log("update", updateData);

        await axios
            .put(`/api/question/${questionId}/${userId}`, updateData)
            .then((res) => {
                console.log("question", res);
            })
            .catch((err) => {
                console.log("question", err);
            });
    }

    return (
        <section className={styles.formSection}>
            <Form
                initialValues={initialValues}
                submit={id ? handleUpdate : handleSubmit}
            >
                <div className={styles.input}>
                    <FormTextarea name="name" label="Question Details" />
                </div>
                <div className={styles.inputContainerFlex2}>
                    <div>
                        <FormInput name="marks" label="Marks" type="number" />
                    </div>

                    <div>
                        <Button type="submit">{id ? "Update" : "Save"}</Button>
                    </div>
                </div>
            </Form>
        </section>
    );
}
