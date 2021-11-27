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

    const { examId } = useParams();

    console.log("[CurrentQuestion]", { examId });

    const [scheduledData, setScheduledData] = useState([]);
    const CONST = "SCHEDULE_REQUEST";
    // useEffect(() => {
    //     get(CONST)
    //         .then((data) => {
    //             console.log("[CurrentQuestion]", { data });
    //         })
    //         .catch((err) => {
    //             console.error("[CurrentQuestion]", err.message);
    //         });
    // }, []);

    const initialValues = {
        question: questionId,
        submitted_by: userId,
        data: "",
    };

    const [submitMessage, setSubmitMessage] = useState();

    async function handleSubmit(e, form) {
        e.preventDefault();
        console.log("[CurrentQuestion]", { form });
        const request = { url: `/api/answer/${examId}/${userId}`, data: form };

        const delayRequest = [...scheduledData, request];
        console.log(
            `%cCurrentQuestion ${JSON.stringify(request)} ${JSON.stringify(
                delayRequest
            )}`,
            "background-color: yellow; color: black; font-weight:bold"
        );

        await axios
            .post(request.url, request.data)
            .then((res) => {
                console.log("[CurrentQuestion]: ", res);
                setSubmitMessage("Successfully Submitted");
            })
            .catch((err) => {
                console.log("[CurrentQuestion]: ", err.message);
                setSubmitMessage("Error submitting answer");

                console.log("[CurrentQuestion]", delayRequest);

                // set("SCHEDULE_REQUEST", delayRequest)
                //     .then((data) =>
                //         console.log("SUCCESSFULLY SCHEDULED REQUESTS", data)
                //     )
                //     .catch((err) =>
                //         console.error(
                //             "FAILED TO SCHEDULE REQUESTS",
                //             err.message
                //         )
                //     );
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
                    name="data"
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
