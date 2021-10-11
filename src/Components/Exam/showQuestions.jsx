import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "../atoms/button";
import { Form, FormInput, FormTextarea } from "../Forms";

import styles from "./exam.module.scss";

function QuestionCard({ question, userId, examId }) {
    const { _id: questionId, name, marks, images } = question;
    // TODO: Add support for images

    const initialValues = { name, marks, images };

    async function updateQuestionHandler(event, form) {
        event.preventDefault();

        await axios
            .put(`/api/question/${questionId}/${userId}`, form)
            .then((res) => {
                console.log("[showQuestions] updateQuestionHandler", res.data);
            })
            .catch((err) =>
                console.error(
                    "[showQuestions] updateQuestionHandler",
                    err.message
                )
            );
    }

    async function removeQuestionHandler() {
        await axios
            .delete(`/api/question/${examId}/${questionId}/${userId}`)
            .then((res) =>
                console.log("[showQuestions] removeQuestionHandler", res.data)
            )
            .catch((err) =>
                console.error(
                    "[showQuestions] removeQuestionHandler",
                    err.message
                )
            );
    }

    return (
        <article>
            <Form initialValues={initialValues} submit={updateQuestionHandler}>
                <div>
                    <FormTextarea
                        name="name"
                        label="Enter the question here..."
                    />
                </div>
                <div>
                    <FormInput name="marks" label="Marks" />
                </div>

                <div className={styles.buttonsContainer}>
                    <Button type="submit">Update Question</Button>
                </div>
            </Form>

            <Button onClick={removeQuestionHandler}>Delete Question</Button>
        </article>
    );
}

export function ShowQuestions({ questions, examId }) {
    const { _id: userId } = useSelector((state) => state.user);

    console.log("[ShowQuestions]", questions);
    return (
        <>
            {questions ? (
                <section>
                    {questions.map((question) => (
                        <QuestionCard
                            key={question._id}
                            question={question}
                            userId={userId}
                            examId={examId}
                        />
                    ))}
                </section>
            ) : (
                ""
            )}
        </>
    );
}
