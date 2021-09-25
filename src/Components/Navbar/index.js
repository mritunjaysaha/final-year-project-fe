import { Link } from "react-router-dom";
import { navLinks } from "../../utils/navlinks";

import styles from "./navbar.module.scss";

export function Navbar() {
    return (
        <nav className={styles.nav}>
            <p>
                <Link to={navLinks.home}>Home</Link>
            </p>
            <p>
                <Link to={navLinks.exam}>Exam</Link>
            </p>
        </nav>
    );
}
