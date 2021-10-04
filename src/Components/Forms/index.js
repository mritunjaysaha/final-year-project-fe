import { useState, createContext } from "react";
import { FormInput } from "./formInput";
import { FormTextarea } from "./textArea";
import { SelectInput } from "./selectInput";

export { FormInput, FormTextarea, SelectInput };

export const FormContext = createContext({ form: {} });

/**
 *
 * @param {children} children
 * @param {submit} submit function to submit the form and send api request
 * @param {Object} initialValues
 * @returns
 */
export function Form(props) {
    const { children, submit = () => {}, initialValues } = props;

    const [form, setForm] = useState(initialValues);
    const [studentIds, setStudentIds] = useState([]);

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleFormSelectChange = (event, selectedOptions) => {
        console.log({ selectedOptions }, selectedOptions.option.value);
        setStudentIds((studentIds) => [
            ...studentIds,
            selectedOptions.option.value,
        ]);

        setForm({
            ...form,
            students: studentIds,
        });
    };

    return (
        <form onSubmit={(e) => submit(e, form)}>
            <FormContext.Provider
                value={{ form, handleFormChange, handleFormSelectChange }}
            >
                {children}
            </FormContext.Provider>
        </form>
    );
}
