import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "../../atoms/button";
import { ShowCourses, CourseForm } from "../../Course";
import { checkRole } from "../../../utils";

import styles from "../../Course/course.module.scss";

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

    switch (checkRole(role)) {
        case "STUDENT":
            return <CourseStudentPage />;
        case "INSTRUCTOR":
            return <CourseInstructorPage />;
        default:
            return <>[Error] Check role</>;
    }
}
