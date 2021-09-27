import styles from "./button.module.scss";

export function Button({ children, fullWidth = false }) {
    return (
        <button
            className={`${styles.button} ${fullWidth ? styles.fullWidth : ""}`}
        >
            {children}
        </button>
    );
}
