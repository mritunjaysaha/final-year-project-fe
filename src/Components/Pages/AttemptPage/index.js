import { useParams } from "react-router-dom";
import { useGetExam } from "../../../customHooks";
export function ExamPage() {
    const { examId } = useParams();

    const { examData } = useGetExam(examId);

    console.log(
        "%c[ExamPage] clicked",
        "background-color: red; color: white; font-weight: bold"
    );

    return (
        <>
            AttemptPage {examId}
            <p>{JSON.stringify(examData)}</p>
        </>
    );
}
