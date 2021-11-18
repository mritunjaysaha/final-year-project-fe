import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetUser, useGetPopulatedCourses } from "../../customHooks";

import { Button } from "../atoms/button";
import { CourseForm } from "./courseForm";
import { ShowCourses } from "./courses";

import { checkRole } from "../../utils/checkRole";

import styles from "./course.module.scss";

function CourseInstructorPage() {
    const [isCreateCourseClicked, setIsCreateCourseClicked] = useState(false);

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

function CourseStudentPage() {
    return (
        <section className={styles.courseContainer}>
            <ShowCourses />
        </section>
    );
}

export default function Course() {
    const { role } = useSelector((state) => state.user);

    // useGetUser();
    // useGetPopulatedCourses();

    switch (checkRole(role)) {
        case "STUDENT":
            return <CourseStudentPage />;
        case "INSTRUCTOR":
            return <CourseInstructorPage />;
        default:
            return <>[Error] Check role</>;
    }
}
