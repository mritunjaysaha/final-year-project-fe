import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "../atoms/button";

import styles from "./course.module.scss";

function CourseCard({ course }) {
    const { _id: courseId } = course;
    const { _id: userId } = useSelector((state) => state.user);

    async function deleteCourseHandler() {
        await axios
            .delete(`/api/course/${courseId}/${userId}`)
            .then((res) => {
                console.log("[CourseCard]", res.data);
            })
            .catch((err) => console.error("[CourseCard]", err.message));
    }

    return (
        <article key={course._id} className={styles.courseCard}>
            <h3>{course.course_name}</h3>
            <Button onClick={deleteCourseHandler}>Delete</Button>
        </article>
    );
}

export function ShowCourses() {
    const { courses } = useSelector((state) => state.course);

    return (
        <section className={styles.showCoursesSection}>
            {courses.map((course) => {
                return <CourseCard course={course} />;
            })}
        </section>
    );
}
