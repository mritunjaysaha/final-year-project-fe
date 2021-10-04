import { useSelector } from "react-redux";
import { useGetExam } from "../../customHooks";
function ExamCard({ examId }) {
    const { examData } = useGetExam(examId);

    if (!!examData) {
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

    return <></>;
}

export function ShowExams() {
    const { exams, _id: userId } = useSelector((state) => state.user);
    console.log(exams);

    if (exams.length <= 0) {
        return <></>;
    }
    // return <>exams</>;
    return (
        <>
            {exams.map((examId) => (
                <ExamCard key={examId} examId={examId} userId={userId} />
            ))}
        </>
    );
}
