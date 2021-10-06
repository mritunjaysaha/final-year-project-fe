import { useState, createContext } from "react";

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

    const handleFormSelectChangeMulti = (name, selectedOptions) => {
        setStudentIds((studentIds) => [
            ...studentIds,
            selectedOptions.option.value,
        ]);

        setForm({
            ...form,
            [name]: studentIds,
        });
    };

    const handleFormSelectChangeSingle = (name, selectedOptions) => {
        setForm({ ...form, [name]: selectedOptions.value });
    };

    return (
        <form onSubmit={(e) => submit(e, form)}>
            <FormContext.Provider
                value={{
                    form,
                    handleFormChange,
                    handleFormSelectChangeMulti,
                    handleFormSelectChangeSingle,
                }}
            >
                {children}
            </FormContext.Provider>
        </form>
    );
}
