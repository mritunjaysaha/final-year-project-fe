import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import { useGetAllAnswerScripts } from "../../../customHooks/answer";
import { Form, FormInput } from "../../Forms";
import { Button } from "../../atoms/button";

import styles from "./evaluate.module.scss";
import axios from "axios";

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
    const { _id: userId } = useSelector((state) => state.user);
    return (
        <section className={styles.allAnswersSection}>
            {answer.length > 0
                ? answer.map(
                      ({
                          _id: answerId,
                          question,
                          submitted_by,
                          data: answer,
                      }) => {
                          console.log("answerId", answerId);
                          return (
                              <Answer
                                  key={answerId}
                                  userId={userId}
                                  answerId={answerId}
                                  question={question}
                                  submittedBy={submitted_by}
                                  answer={answer}
                              />
                          );
                      }
                  )
                : ""}
        </section>
    );
}

function Answer({ userId, answerId, question, submittedBy, answer }) {
    const { name, images, marks } = question;
    const { first_name: firstName, last_name: lastName, email } = submittedBy;

    const initialValues = { marks: 0 };

    async function handleSubmit(e, form) {
        e.preventDefault();
        console.log("Marks uploaded", { form });

        await axios
            .put(`/api/answer/marks/${answerId}/${userId}`, form)
            .then((res) => {
                console.log("[Answer] [handleSubmit]", { res });
            })
            .catch((err) => console.error(err));
    }

    return (
        <article className={styles.answerArticle}>
            <SubmittedBy
                firstName={firstName}
                lastName={lastName}
                email={email}
            />
            <Question images={images} question={name} marks={marks} />

            <p>{answer}</p>

            <Form initialValues={initialValues} submit={handleSubmit}>
                <FormInput name="marks" label="Marks" type="number" />
                <Button type="submit">Submit</Button>
            </Form>
        </article>
    );
}

Answer.propTypes = {
    userId: PropTypes.string.isRequired,
    answerId: PropTypes.string.isRequired,
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
