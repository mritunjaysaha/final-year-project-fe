import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { useGetAllAnswerScripts } from "../../../customHooks/answer";

export default function EvaluatePage() {
    const { examId } = useParams();

    useGetAllAnswerScripts(examId);

    return (
        <>
            <AllAnswers />
        </>
    );
}

function AllAnswers() {
    const { answer } = useSelector((state) => state);

    return (
        <section>
            {answer.length > 0
                ? answer.map(({ _id, question, submitted_by, data }) => (
                      <Answer
                          key={_id}
                          _id={_id}
                          question={question}
                          submittedBy={submitted_by}
                          answer={data}
                      />
                  ))
                : ""}
        </section>
    );
}

function Answer({ _id, question, submittedBy, answer }) {
    const { data, images, marks } = question;
    const { first_name: firstName, last_name: lastName, email } = submittedBy;
    return (
        <article>
            <Question images={images} question={data} marks={marks} />

            <SubmittedBy
                firstName={firstName}
                lastName={lastName}
                email={email}
            />
            <div>{answer}</div>
        </article>
    );
}

Answer.propTypes = {
    _id: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    submittedBy: PropTypes.object.isRequired,
    answer: PropTypes.string.isRequired,
};

function Question({ images, question, marks }) {
    return (
        <div>
            <p>{question}</p> <span>[Marks: {marks}]</span>
            {!!images && <img src={images} alt={question} />}
        </div>
    );
}

Question.propTypes = {
    question: PropTypes.string.isRequired,
    marks: PropTypes.number.isRequired,
};

function SubmittedBy({ firstName, lastName, email }) {
    return (
        <div>
            <p>{`${firstName} ${lastName}`}</p>
            <p>{email}</p>
        </div>
    );
}

SubmittedBy.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};
