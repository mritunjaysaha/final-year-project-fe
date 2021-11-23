import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Button } from "../../atoms/button";
import { FormTextarea, Form } from "../../Forms";
import { get, set } from "idb-keyval";

function CurrentQuestion({ question }) {
    const { name, marks, _id: questionId } = question;
    const { _id: userId } = useSelector((state) => state.user);
    const { _id: examId } = useSelector((state) => state.exam);

    const initialValues = {
        question: questionId,
        submitted_by: userId,
        answer: "",
    };

    const [submitMessage, setSubmitMessage] = useState();

    async function handleSubmit(e, form) {
        e.preventDefault();
        const request = [
            { url: `/api/answer/${examId}/${userId}`, data: form },
        ];

        console.log(
            `%cCurrentQuestion ${JSON.stringify(form)}`,
            "background-color: yellow; color: black; font-weight:bold"
        );

        await axios
            .post(request.url, request.data)
            .then((res) => {
                console.log("CurrentQuestion: ", res);
                setSubmitMessage("Successfully Submitted");
            })
            .catch((err) => {
                console.log("CurrentQuestion: ", err.message);
                setSubmitMessage("Error submitting answer");

                get("SCHEDULE_REQUEST")
                    .then((data) => {
                        data.push(request);

                        set("SCHEDULE_REQUEST", data);
                    })
                    .catch((err) => {
                        console.error(
                            "[CurrentQuestion] SCHEDULE REQUESTS DOESN'T EXIST",
                            err.message
                        );

                        set("SCHEDULE_REQUEST", request);
                    });
            });
    }

    return (
        <section>
            <article>
                <p>{name}</p>
                <p>{marks}</p>
            </article>
            <Form initialValues={initialValues} submit={handleSubmit}>
                <FormTextarea
                    name="answer"
                    placeholder="Type your answer here..."
                />
                <Button type="submit">Submit</Button>
            </Form>
            {submitMessage}
        </section>
    );
}

export default function AttemptPage() {
    const { exams } = useSelector((state) => state.exam);
    const { examId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    function handleCurrentIndex(e) {
        const { name } = e.target;

        switch (name) {
            case "previous":
                if (currentIndex - 1 >= 0)
                    setCurrentIndex((previousIndex) => previousIndex - 1);
                return;
            case "next":
                if (currentIndex + 1 < questions.length)
                    setCurrentIndex((previousIndex) => previousIndex + 1);
                return;
            default:
                return;
        }
    }

    useEffect(() => {
        exams.map(({ _id, questions }) => {
            if (_id === examId) {
                setQuestions(questions);
            }
        });
    }, [examId, exams]);

    return (
        <>
            {!!questions.length ? (
                <CurrentQuestion question={questions[currentIndex]} />
            ) : (
                ""
            )}

            <div>
                <Button name="previous" onClick={handleCurrentIndex}>
                    Previous
                </Button>
                <Button name="next" onClick={handleCurrentIndex}>
                    Next
                </Button>
            </div>
        </>
    );
}
