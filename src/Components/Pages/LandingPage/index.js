import axios from "axios";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setAuth } from "../../../reducers/actions";

import { Form, FormInput } from "../../Forms";
import { Button } from "../../atoms/button";

import styles from "./landingPage.module.scss";

export function LandingPage() {
    const dispatch = useDispatch();

    const initialValues = {
        email: "",
        password: "",
    };

    async function handleSubmit(e, form) {
        e.preventDefault();
        console.log(form);

        await axios
            .post(`/api/login`, form)
            .then((res) => {
                window.localStorage.setItem("jwtToken", res.data.token);

                const decoded = jwtDecode(res.data.token);
                dispatch(setAuth(decoded));
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    return (
        <section className={styles.landingPageSection}>
            <div className={styles.landingPageFormContainer}>
                <Form submit={handleSubmit} initialValues={initialValues}>
                    <div className={styles.inputContainer}>
                        <FormInput
                            name="email"
                            type="email"
                            label="E-mail"
                            placeholder="E-mail"
                            aria-label="email-input"
                            aria-required="true"
                            role="textbox"
                        />
                        <FormInput
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Password"
                            aria-label="password-input"
                            aria-required="true"
                            role="textbox"
                        />
                    </div>

                    <Button fullWidth={true} type="submit">
                        Log In
                    </Button>
                </Form>
            </div>
        </section>
    );
}
