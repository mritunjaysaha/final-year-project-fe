import axios from "axios";
import { Button } from "../atoms/button";
import { Form } from "../Forms";
import { FormInput } from "../Forms/formInput";

import styles from "./exam.module.scss";

export function QuestionForm() {
    const examId = "61536337446e2b0874c883a0";
    const userId = "614cc588456a3d4d0c3a9185";

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
            .post(
                `http://localhost:9000/api/question/${examId}/${userId}`,
                form
            )
            .then((res) => {
                console.log("question", res);
            })
            .catch((err) => {
                console.log("question", err.message);
            });
    }

    return (
        <section className={styles.formSection}>
            <Form initialValues={initialValues} submit={handleSubmit}>
                <div className={styles.input}>
                    <FormInput name="name" label="Question Details" />
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
