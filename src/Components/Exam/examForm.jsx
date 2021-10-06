import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Form } from "../Forms";
import { FormInput, SelectInput } from "../Forms";
import { Button } from "../atoms/button";
import { MUIDateAndTimePicker } from "../DateAndTime";

import styles from "./exam.module.scss";
import { useGetPopulatedCourses } from "../../customHooks";

export function ExamForm({ formCloseHandler }) {
    const { _id: userId } = useSelector((state) => state.user);
    const { courses } = useSelector((state) => state.course);

    useGetPopulatedCourses();

    const [options, setOptions] = useState([]);

    const initialValues = {
        name: "Demo Exam",
        course: "",
        course_coordinator: userId,
        time_limit: "3", // date or number type only -- cannot have 'hours' or other strings
        total_marks: "80",
        start_date: Date.now(),
        active_for: Date.now(),
    };

    useEffect(() => {
        function createCourseOptions(allCourses) {
            let executed = false;

            function create() {
                if (!executed) {
                    executed = true;
                    for (let i = 0, len = allCourses.length; i < len; i++) {
                        setOptions((options) => [
                            ...options,
                            {
                                value: allCourses[i]._id,
                                label: allCourses[i].course_name,
                            },
                        ]);
                    }
                    setOptions((options) => [...new Set(options)]);
                }
            }

            create();
        }

        if (courses.length > 0) {
            createCourseOptions(courses);
        }
    }, [courses]);

    async function handleSubmit(e, form) {
        e.preventDefault();

        await axios
            .post(`/api/exam/${userId}`, form)
            .then((res) => {
                console.log({ res });
                formCloseHandler();
            })
            .catch((err) => {
                console.log({ err });
            });
    }

    return (
        <section className={styles.formSection}>
            <Form initialValues={initialValues} submit={handleSubmit}>
                <div className={styles.input}>
                    <FormInput name="name" label="Title" />
                </div>
                {/* make it a dropdown menu */}
                <div className={styles.input}>
                    <SelectInput
                        name="course"
                        label="Course"
                        options={options}
                    />
                    {console.log({ options })}
                </div>
                <div className={styles.inputContainerFlex2}>
                    <div className={styles.input}>
                        <MUIDateAndTimePicker label="Date and Time" />
                    </div>
                    <div className={styles.input}>
                        <FormInput
                            name="time_limit"
                            label="Duration (in hours)"
                        />
                    </div>
                    <div className={styles.input}>
                        <FormInput
                            type="number"
                            name="total_marks"
                            label="Total Marks"
                        />
                    </div>
                </div>
                <div>
                    <Button type="submit">Submit</Button>
                </div>
            </Form>
        </section>
    );
}
