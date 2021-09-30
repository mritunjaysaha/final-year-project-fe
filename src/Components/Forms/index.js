import { useState, createContext } from "react";
import { FormInput } from "./formInput";
import { FormTextarea } from "./textArea";

export { FormInput };
export { FormTextarea };

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

    return (
        <form onSubmit={(e) => submit(e, form)}>
            <FormContext.Provider value={{ form, handleFormChange }}>
                {children}
            </FormContext.Provider>
        </form>
    );
}
