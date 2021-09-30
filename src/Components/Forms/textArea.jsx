import { useContext } from "react";
import { TextareaAutosize } from "@mui/material";
import { FormContext } from "./index";

import styles from "./form.module.scss";

export function FormTextarea({ name, label, ...rest }) {
    const formContext = useContext(FormContext);
    const { form, handleFormChange } = formContext;

    return (
        <TextareaAutosize
            className={styles.textarea}
            name={name}
            value={form[name]}
            onChange={handleFormChange}
            minRows={4}
            {...rest}
        />
    );
}
