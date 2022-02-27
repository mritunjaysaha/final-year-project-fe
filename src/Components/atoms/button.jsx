import styles from "./button.module.scss";
import PropTypes from "prop-types";
export function Button({ children, fullWidth = false, ...rest }) {
    return (
        <button
            className={`${styles.button} ${fullWidth ? styles.fullWidth : ""}`}
            {...rest}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    fullWidth: PropTypes.bool,
    children: PropTypes.any.isRequired,
};
