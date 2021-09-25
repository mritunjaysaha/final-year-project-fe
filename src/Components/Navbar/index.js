import { Link } from "react-router-dom";
import { navLinks } from "../../utils/navlinks";

export function Navbar() {
    return (
        <nav>
            <p>
                <Link to={navLinks.home}>Home</Link>
            </p>
            <p>
                <Link to={navLinks.exam}>Exam</Link>
            </p>
        </nav>
    );
}
