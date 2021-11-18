import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "../atoms/button";
import { Form } from "../Forms";
import { FormInput, FormTextarea } from "../Forms";

import styles from "./exam.module.scss";

export function QuestionForm({ examId, formCloseHandler }) {
    const { _id: userId } = useSelector((state) => state.user);

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
                formCloseHandler();
            })
            .catch((err) => {
                console.log("question", err.message);
            });
    }

    return (
        <section className={styles.formSection}>
            <Form initialValues={initialValues} submit={handleSubmit}>
                <div className={styles.input}>
                    <FormTextarea name="name" label="Question Details" />
                </div>
                <div className={styles.inputContainerFlex2}>
                    <div>
                        <FormInput name="marks" label="Marks" type="number" />
                    </div>

                    <div>
                        <Button type="submit">Save</Button>
                    </div>
                </div>
            </Form>
        </section>
    );
}
