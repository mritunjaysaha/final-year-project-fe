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
                    setIsCreateCourseClicked(true);
                }}
            >
                Create Course
            </Button>
            {isCreateCourseClicked ? (
                <section className={styles.courseFormContainer}>
                    <CourseForm
                        formCloseHandler={() => {
                            setIsCreateCourseClicked(false);
                        }}
                    />
                </section>
            ) : (
                ""
            )}
            {/* Courses */}
            <section>
                <ShowCourses />
            </section>
        </section>
    );
}
