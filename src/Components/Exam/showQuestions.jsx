function QuestionCard({ question }) {
    const { name, marks, images } = question;
    // TODO: Add support for images

    return (
        <article>
            <p>{name}</p>
            <p>{marks}</p>
        </article>
    );
}

export function ShowQuestions({ questions }) {
    console.log("[ShowQuestions]", questions);
    return (
        <>
            {questions ? (
                <section>
                    {questions.map((question) => (
                        <QuestionCard key={question._id} question={question} />
                    ))}
                </section>
            ) : (
                ""
            )}
        </>
    );
}
