import styles from "./button.module.scss";

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
