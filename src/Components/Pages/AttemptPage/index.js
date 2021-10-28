import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button } from "../../atoms/button";
import { FormTextarea, Form } from "../../Forms";
import { useGetExam } from "../../../customHooks";

export function ExamPage() {
    const { examId } = useParams();
    const { questions } = useSelector((state) => state.exam);

    const [currentIndex, setCurrentIndex] = useState(0);

    useGetExam(examId);

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

    function CurrentQuestion() {
        const { name, marks } = questions[currentIndex];

        function handleSubmit(e, form) {
            e.preventDefault();

            console.log(
                `%cCurrentQuestion ${JSON.stringify(form)}`,
                "background-color: yellow; color: black; font-weight:bold"
            );
        }

        const initialValues = {
            answer: "",
        };

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
                </Form>
            </section>
        );
    }

    return (
        <>
            {!!questions.length ? <CurrentQuestion /> : ""}

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
