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

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleFormSelectChange = (event, selectedOptions) => {
        console.log("id: ", event.target.id);
        console.log(selectedOptions);
        setForm({
            ...form,
            students: selectedOptions,
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
