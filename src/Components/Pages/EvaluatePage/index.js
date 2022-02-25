import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { useGetAllAnswerScripts } from "../../../customHooks/answer";

import styles from "./evaluate.module.scss";

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
        <section className={styles.allAnswersSection}>
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
    const { name, images, marks } = question;
    const { first_name: firstName, last_name: lastName, email } = submittedBy;

    return (
        <article className={styles.answerArticle}>
            <SubmittedBy
                firstName={firstName}
                lastName={lastName}
                email={email}
            />
            <Question images={images} question={name} marks={marks} />

            <p>{answer}</p>
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
        <div className={styles.questionDiv}>
            <p>
                {question}&nbsp;<span>[Marks: {marks}]</span>
            </p>
            {!!images.length && <img src={images} alt={question} />}
        </div>
    );
}

Question.propTypes = {
    question: PropTypes.string.isRequired,
    marks: PropTypes.number.isRequired,
};

function SubmittedBy({ firstName, lastName, email }) {
    return (
        <div className={styles.submittedByDiv}>
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
