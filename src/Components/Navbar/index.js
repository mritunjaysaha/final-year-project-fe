import { Link } from "react-router-dom";
import { MyProfileNav } from "../MyProfile/MyProfileNav";

import { navLinks } from "../../utils/navlinks";

import styles from "./navbar.module.scss";

export function Navbar() {
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
        </nav>
    );
}
