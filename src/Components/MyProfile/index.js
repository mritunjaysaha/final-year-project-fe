import { useSelector } from "react-redux";

export function MyProfile() {
    const { username, email, first_name, last_name } = useSelector(
        (state) => state.user
    );

    return (
        <>
            My Profile
            {/* first_name ----- last_name*/}
            {/* username */}
            {/* email */}
            {/* save details button */}
        </>
    );
}
