import { useState } from "react";

import { useGetUser } from "../../customHooks";

import { Button } from "../atoms/button";
import { CourseForm } from "./courseForm";

import styles from "./course.module.scss";

export function Course() {
    const [isCreateCourseClicked, setIsCreateCourseClicked] = useState(false);

    useGetUser();

    return (
        <section className={styles.courseContainer}>
            <Button
                onClick={() => {
                    setIsCreateCourseClicked(!isCreateCourseClicked);
                }}
            >
                Create Course
            </Button>
            <section className={styles.courseFormContainer}>
                <CourseForm />
            </section>

            {/* Courses */}
            <section></section>
        </section>
    );
}
