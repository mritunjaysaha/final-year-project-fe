import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button } from "../../atoms/button";

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

    console.log(
        "%c[ExamPage] clicked",
        "background-color: red; color: white; font-weight: bold"
    );

    return (
        <>
            AttemptPage {examId}
            <p>{questions.length}</p>
            <p>{currentIndex}</p>
            <p>{JSON.stringify(questions[currentIndex])}</p>
            <Button name="previous" onClick={handleCurrentIndex}>
                Previous
            </Button>
            <Button name="next" onClick={handleCurrentIndex}>
                Next
            </Button>
        </>
    );
}
