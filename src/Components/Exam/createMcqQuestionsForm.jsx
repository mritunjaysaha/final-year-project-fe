import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "../atoms/button";
import { Form } from "../Forms";
import { FormInput } from "../Forms";
import { array } from "prop-types";

export function CreateMcqQuestionForm({ examId, formCloseHandler }) {
    const { __id: userId } = useSelector((state) => state.user);
    const [formValues, setFormValues] = useState({
        question: "",
        options: [],
        correctAnswer: "",
    });

    const [temp, setTemp] = useState("");

    const [listComponents, SetListComponents] = useState([]);

    useEffect(() => {
        console.log("mcq useEffect", { formValues });
    }, [formValues]);

    // async function handleSubmit(e, form) {
    //     e.preventDefault();

    //     console.log("CreateMcqQuestionForm", form);

    //     await axios
    //         .post(`/api/mcqQuestion/${examId}/${userId}`, form)
    //         .then((res) => {
    //             console.log("mcqQuestion", res);
    //             formCloseHandler();
    //         })
    //         .catch((err) => {
    //             console.log("mcqQuestion", err.message);
    //         });
    // }

    function handleOnChange(e) {
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value });
    }

    function handleOnChangeListComponents(e) {
        e.preventDefault();

        const index = e.target.getAttribute("data-index");

        const optionsArray = formValues.options;

        console.log(
            "mcq use handleOnChangeListComponents()",
            e.target.value,
            index,
            optionsArray[index],
            optionsArray
        );

        setFormValues({ ...formValues, options: optionsArray });
    }

    function generateOptions(e) {
        e.preventDefault();

        console.log("generateOptions", formValues);

        // Reset listComponentsState
        SetListComponents([]);
        let count = 0;

        const optionsArray = [];

        while (count < 4) {
            optionsArray.push("");
            count++;
        }

        setFormValues({ ...formValues, options: optionsArray });
        console.log("mcq optionsArray", optionsArray);

        count = 0;

        while (count < 4) {
            const component = ListComponents(count);
            SetListComponents((prev) => [...prev, component]);
            count++;
        }

        console.log("mcq generateOptions()", formValues);
    }

    function ListComponents(index) {
        return (
            <li>
                <FormInput
                    name={`option-${index}`}
                    label={`option-${index}`}
                    data-index={index}
                    value={formValues.options[index]}
                    onChange={handleOnChangeListComponents}
                />
                <Button>Correct Answer</Button>
            </li>
        );
    }

    // TODO: Change the form with formik or react hook forms

    return (
        <section>
            <form>
                <div>
                    <FormInput name="question" label="Question" />
                </div>
                <div>
                    <input
                        name="numberOfOptions"
                        label="No. of Options"
                        value={formValues.numberOfOptions}
                        onChange={handleOnChange}
                    />

                    <Button onClick={generateOptions}>MCQ</Button>
                    <Button onClick={generateOptions}>QUIZ</Button>
                </div>
                <ul>
                    <h3>Options</h3>

                    {listComponents.map((element) => element)}
                </ul>

                <div>
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </section>
    );
}
