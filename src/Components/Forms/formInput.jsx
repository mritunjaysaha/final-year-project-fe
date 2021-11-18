import { useContext, useRef } from "react";
import AutosizeInput from "react-input-autosize";
import { UilPen } from "@iconscout/react-unicons";

import { FormContext } from "./index";

import styles from "./form.module.scss";

export function FormInput(props) {
    const { label, type = "text", name, ...rest } = props;

    const formContext = useContext(FormContext);
    const { form, handleFormChange } = formContext;

    const inputRef = useRef();

    return (
        <div className={styles.formInputContainer}>
            <label htmlFor={name}>{label}</label>
            <div>
                <AutosizeInput
                    ref={inputRef}
                    variant="outlined"
                    type={type}
                    id={name}
                    name={name}
                    placeholder={label}
                    value={form[name]}
                    onChange={handleFormChange}
                    {...rest}
                />
                <span>
                    <UilPen
                        className={styles.icon}
                        onClick={() => {
                            inputRef.current.focus();
                        }}
                    />
                </span>
            </div>
        </div>
    );
}
