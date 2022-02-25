import { useContext, useRef } from "react";
import AutosizeInput from "react-input-autosize";
import { UilPen } from "@iconscout/react-unicons";
import PropTypes from "prop-types";

import { FormContext } from "./index";

import styles from "./form.module.scss";

/**
 *
 * @param {*} props
 * @param {String} label
 * @param {String} type - default: text
 * @param {String} name
 * @param ...rest
 * @returns
 */
export function FormInput({ label, type = "text", name, ...rest }) {
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

Function.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
};
