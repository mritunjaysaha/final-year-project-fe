import { useSelector } from "react-redux";

export function ShowCourses() {
    const { courses } = useSelector((state) => state.course);
    return (
        <>
            {courses.map((course) => {
                return (
                    <article key={course._id}>
                        <p>{course.course_name}</p>
                    </article>
                );
            })}
        </>
    );
}
