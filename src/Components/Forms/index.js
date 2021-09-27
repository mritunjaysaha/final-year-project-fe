import { useState, createContext } from "react";
import { Button } from "../atoms/button";

export const FormContext = createContext({ form: {} });

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
        <form>
            <FormContext.Provider value={{ form, handleFormChange }}>
                {children}
            </FormContext.Provider>

            <Button fullWidth={true} type="button" onClick={() => submit(form)}>
                Submit
            </Button>
        </form>
    );
}
