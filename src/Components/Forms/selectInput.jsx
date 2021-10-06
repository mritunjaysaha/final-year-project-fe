import { useContext } from "react";
import Select from "react-select";

import { FormContext } from "./index";

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

    console.log("select-input", name);

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
