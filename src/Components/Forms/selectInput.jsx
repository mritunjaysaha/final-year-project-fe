import { useContext } from "react";
import Select from "react-select";

import { FormContext } from "./index";

export function SelectInput({ name, label, options, ...rest }) {
    const formContext = useContext(FormContext);
    const { handleFormSelectChange } = formContext;

    return (
        <Select
            isMulti
            placeholder={label}
            options={options}
            onChange={handleFormSelectChange}
            {...rest}
        />
    );
}
