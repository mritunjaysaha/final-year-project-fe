import axios from "axios";

import { Form } from "../Forms";
import { FormInput } from "../Forms/formInput";
import { Button } from "../atoms/button";
import styles from "./landingPage.module.scss";

export function LandingPage() {
    const initialValues = {
        email: "teacher@test.com",
        password: "123456",
    };

    async function handleSubmit(e, form) {
        e.preventDefault();
        console.log(form);

        await axios
            .post(`/api/login`, form)
            .then((res) => {
                console.log("res", res.data);
                window.localStorage.setItem("jwtToken", res.data.token);
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
