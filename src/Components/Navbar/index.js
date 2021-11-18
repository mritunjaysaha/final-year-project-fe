import { Link, useNavigate } from "react-router-dom";

import { Button } from "../atoms/button";
import { MyProfileNav } from "../MyProfile/MyProfileNav";
import { navLinks } from "../../utils/navlinks";

import styles from "./navbar.module.scss";

export function Navbar() {
    const navigate = useNavigate();

    function logoutHandler() {
        console.log("logout handler clicked");
        localStorage.removeItem("jwtToken");
        navigate(navLinks.home);
    }

    return (
        <nav className={styles.nav}>
            <p>
                <Link to={navLinks.home}>Home</Link>
            </p>
            <p>
                <Link to={navLinks.course}>Course</Link>
            </p>
            <p>
                <Link to={navLinks.exam}>Exam</Link>
            </p>
            <p>
                <MyProfileNav />
            </p>
            <p>
                <Button onClick={logoutHandler}>Log out</Button>
            </p>
        </nav>
    );
}
