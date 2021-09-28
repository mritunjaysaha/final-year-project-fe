import { useContext } from "react";
import TextField from "@mui/material/TextField";
import { FormContext } from "./index";

export function FormInput(props) {
    const { label, type = "text", name, ...rest } = props;

    console.log("props", props);

    const formContext = useContext(FormContext);
    const { form, handleFormChange } = formContext;

    return (
        <TextField
            variant="outlined"
            fullWidth
            type={type}
            name={name}
            label={name}
            value={form[name]}
            onChange={handleFormChange}
            {...rest}
        />
    );
}
