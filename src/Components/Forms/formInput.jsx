import { useContext } from "react";
import { FormContext } from "./index";

export function FormInput(props) {
    const { label, type = "text", name, ...rest } = props;

    const formContext = useContext(FormContext);
    const { form, handleFormChange } = formContext;

    return (
        <div>
            <label>{label}</label>
            <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleFormChange}
                {...rest}
            />
        </div>
    );
}
