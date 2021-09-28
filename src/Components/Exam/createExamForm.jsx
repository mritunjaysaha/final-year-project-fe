import { Form } from "../Forms";
import { FormInput } from "../Forms/formInput";
import { Button } from "../atoms/button";
import { TextField } from "@mui/material";
import styles from "./createExamForm.module.scss";

export function ExamForm() {
    const initialValues = {
        name: "",
        course: "",
        time_limit: "",
        total_marks: "",
    };

    async function handleSubmit(e, form) {
        e.preventDefault();

        console.log("exam", form);
    }

    return (
        <section className={styles.examFormSection}>
            <Form initialValues={initialValues} submit={handleSubmit}>
                <div className={styles.input}>
                    <FormInput
                        fullWidth
                        variant="outlined"
                        label="outlined"
                        name="Title"
                    />
                    <TextField fullWidth variant="outlined" label="outlined" />
                </div>
                {/* make it a dropdown menu */}
                {/* <div className={styles.input}>
                    <FormInput name="course" placeholder="Course" />
                </div>
                <div className={styles.inputContainerFlex2}>
                    <div className={styles.input}>
                        <FormInput name="time_limit" placeholder="Duration" />
                    </div>
                    <div className={styles.input}>
                        <FormInput
                            type="number"
                            name="total_marks"
                            placeholder="Total Marks"
                        />
                    </div>{" "}
                </div> */}
                <div>
                    <Button>Submit</Button>
                </div>
            </Form>
        </section>
    );
}
