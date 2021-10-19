import { useParams } from "react-router-dom";
export function ExamPage() {
    const { examId } = useParams();

    console.log(
        "%c[ExamPage] clicked",
        "background-color: red; color: white; font-weight: bold"
    );
    return <>ExamPage {examId}</>;
}
