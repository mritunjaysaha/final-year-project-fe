import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "../atoms/button";
import { Form } from "../Forms";
import { FormInput } from "../Forms";

export function CreateMcqQuestionForm({ examId, formCloseHandler }) {
    const [numberOfOptions, setNumberOfOptions] = useState(0);
    const { __id: userId } = useSelector((state) => state.user);
    const [formValues, setFormValues] = useState({ numberOfOptions: 0 });

    const [listComponents, SetListComponents] = useState([]);

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

    function generateOptions(e) {
        e.preventDefault();

        console.log("generateOptions", formValues);

        // Reset listComponentsState
        SetListComponents([]);
        let count = 0;

        while (count < numberOfOptions) {
            count++;
            const component = ListComponents(count);
            SetListComponents((prev) => [...prev, component]);
        }
    }

    function handleOnChange(e) {
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value });

        setNumberOfOptions(value);
    }

    function ListComponents(index) {
        return (
            <li>
                <FormInput name={`option-${index}`} label={`option-${index}`} />
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

                    <Button onClick={generateOptions}>Generate Options</Button>
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
