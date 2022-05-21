import { useState, useEffect } from "react";

const DUMMY_MCQ_SCHEMA = {
    question: "",
    options: [
        { value: "", isCorrect: "default: false", answered: "default: null" },
    ],
};

// ! Add restriction for at least one option to be true

const test = {
    question: "Number of wheels in a car",
    options: [
        { value: "1", isCorrect: false },
        { value: "2", isCorrect: false },
        { value: "3", isCorrect: false },
        { value: "4", isCorrect: true },
    ],
};

export function MCQExam() {
    const [checkedState, setCheckedState] = useState(
        new Array(test.options.length).fill(false)
    );

    const [answeredIndex, setAnsweredIndex] = useState(null);

    const handleChange = (position) => {
        console.log("handleChange clicked");
        const updatedCheckedState = new Array(test.options.length).fill(false);

        updatedCheckedState[position] = true;

        setAnsweredIndex(position);

        setCheckedState(updatedCheckedState);
    };

    const handleMCQCorrectAnswerButton = (correctOption) => {};

    useEffect(() => {
        console.log({ answeredIndex });
    }, [answeredIndex]);

    return (
        <div>
            {JSON.stringify(test)}
            <h3>{test.question}</h3>
            <ul>
                {test.options.map(({ value }, index) => {
                    return (
                        <li key={index}>
                            <div>
                                <div>
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={value}
                                        value={value}
                                        checked={checkedState[index]}
                                        onChange={() => handleChange(index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>
                                        {value}
                                    </label>
                                    <button
                                        onClick={() =>
                                            handleMCQCorrectAnswerButton(
                                                `custom-checkbox-${index}`
                                            )
                                        }
                                    >
                                        Correct Answer
                                    </button>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
