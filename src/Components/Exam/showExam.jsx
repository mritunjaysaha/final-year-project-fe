import { useSelector } from "react-redux";
import { useGetExam } from "../../customHooks";
function ExamCard({ examId }) {
    const { examData } = useGetExam(examId);
    const { _id, name, total_marks, time_limit, start_date } = examData;
    return (
        <div id={_id}>
            <p>{name}</p>
            <p>{total_marks}</p>
            <p>{time_limit}</p>
            <p>{start_date}</p>
            <p>{total_marks}</p>
        </div>
    );
}

export function ShowExams() {
    const { exams, _id: userId } = useSelector((state) => state.user);

    return (
        <>
            {exams.map((examId) => (
                <ExamCard examId={examId} userId={userId} />
            ))}
        </>
    );
}
