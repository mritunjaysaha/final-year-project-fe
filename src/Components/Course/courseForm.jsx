import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { useGetAllUsers } from "../../customHooks";
import { Form } from "../Forms";
import { FormInput, SelectInput } from "../Forms";
import { Button } from "../atoms/button";

import styles from "./course.module.scss";

export function CourseForm() {
    const { _id: userId } = useSelector((state) => state.user);
    const { allUsers } = useGetAllUsers();

    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (!allUsers) {
            console.log("returned", { allUsers });
            return;
        }

        function fillOptions() {
            let executed = false;

            function fill() {
                if (!executed) {
                    executed = true;
                    for (let i = 0, len = allUsers.length; i < len; i++) {
                        setOptions((options) => [
                            ...options,
                            {
                                value: allUsers[i]._id,
                                label: allUsers[i].email,
                            },
                        ]);
                    }
                    setOptions((options) => [...new Set(options)]);
                }
            }

            fill();
        }

        fillOptions();
    }, [allUsers]);

    const initialValues = {
        course_name: "Demo Course",
        course_coordinator: userId,
        students: [],
    };

    const keys = Object.keys(initialValues);

    async function handleSubmit(e, form) {
        e.preventDefault();
        console.log({ form });
        await axios
            .post(`/api/course/${userId}`, form)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <section className={styles.formSection}>
            <Form initialValues={initialValues} submit={handleSubmit}>
                <div className={styles.input}>
                    <FormInput
                        id={keys[0]}
                        name={keys[0]}
                        label="Course Title"
                        aria-label="Course Title"
                        aria-required="true"
                    />
                </div>

                {/* TODO: Add something to enrol students in the course */}
                <SelectInput
                    options={options}
                    name="students"
                    label="Enroll Students"
                />

                <Button type="submit" aria-label="submit">
                    Submit
                </Button>
            </Form>
        </section>
    );
}
