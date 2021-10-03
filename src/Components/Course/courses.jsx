import { useSelector } from "react-redux";

export function ShowCourses() {
    const { courses } = useSelector((state) => state.course);
    return (
        <>
            {courses.map((course) => {
                return (
                    <article>
                        <p>{course.course_name}</p>
                    </article>
                );
            })}
        </>
    );
}
