import { useState } from "react";

import { useGetUser, useGetPopulatedCourses } from "../../customHooks";

import { Button } from "../atoms/button";
import { CourseForm } from "./courseForm";
import { ShowCourses } from "./courses";

import styles from "./course.module.scss";

export function Course() {
    const [isCreateCourseClicked, setIsCreateCourseClicked] = useState(false);

    useGetUser();
    useGetPopulatedCourses();

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
            <section>
                <ShowCourses />
            </section>
        </section>
    );
}
