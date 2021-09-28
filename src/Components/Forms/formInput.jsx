import { useContext } from "react";
import TextField from "@mui/material/TextField";
import { FormContext } from "./index";

export function FormInput(props) {
    const { label, type = "text", name, ...rest } = props;

    const formContext = useContext(FormContext);
    const { form, handleFormChange } = formContext;

    return (
        <TextField
            variant="outlined"
            fullWidth
            type={type}
            name={name}
            label={label}
            value={form[name]}
            onChange={handleFormChange}
            {...rest}
        />
    );
}
