import { useContext } from "react";
import Select from "react-select";

import { FormContext } from "./index";

/**
 *
 * @param {Boolean} isMulti -- default value: false
 * @param {String} name -- it should be same as one of the keys of the form object
 * @param {String} label
 * @param {Array} options
 * @returns
 */
export function SelectInput({
    isMulti = false,
    name,
    label,
    options,
    ...rest
}) {
    const formContext = useContext(FormContext);
    const { handleFormSelectChangeMulti, handleFormSelectChangeSingle } =
        formContext;

    return (
        <Select
            isMulti={isMulti}
            placeholder={label}
            options={options}
            onChange={(selectedOptions) => {
                if (isMulti) {
                    handleFormSelectChangeMulti(name, selectedOptions);
                } else {
                    handleFormSelectChangeSingle(name, selectedOptions);
                }
            }}
            {...rest}
        />
    );
}
