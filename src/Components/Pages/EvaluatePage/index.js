import { useParams } from "react-router-dom";

import { useGetAllAnswerScripts } from "../../../customHooks/answer";

export default function EvaluatePage() {
    const { examId } = useParams();

    useGetAllAnswerScripts(examId);

    return <header>Evaluate Page</header>;
}
