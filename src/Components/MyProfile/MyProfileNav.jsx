import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function MyProfileNav() {
    const { username, email } = useSelector((state) => state.user);

    return <>MyProfileNav</>;
}
