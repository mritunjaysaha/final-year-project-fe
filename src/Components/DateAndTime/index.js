import { useState } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { TextField } from "@mui/material";

export function MUIDateAndTimePicker({ label }) {
    const [value, setValue] = useState();

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DateTimePicker
                label={label}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    console.log("data and time picker", newValue);
                }}
                renderInput={(props) => <TextField {...props} />}
            />
        </LocalizationProvider>
    );
}
