import axios from "axios";
import { Button } from "../../atoms/button";
import { Form, FormInput } from "../../Forms";

export default function SignUpPage() {
    const initialValues = {
        email: "",
        password: "",
    };

    async function handleSubmit(e, form) {
        e.preventDefault();

        await axios
            .post("/api/auth/signup", form)
            .then((res) => {
                console.log("[SignUpPage] handleSubmit", res.data);
            })
            .catch((err) => console.error(err));
    }

    return (
        <section>
            <Form initialValues={initialValues} submit={handleSubmit}>
                <div>
                    <FormInput
                        id="signup"
                        name="email"
                        label="E-mail"
                        aria-label="E-mail"
                        aria-required="true"
                        type="email"
                    />
                </div>

                <div>
                    <FormInput
                        id="signup"
                        name="password"
                        label="Password"
                        aria-label="Password"
                        aria-required="true"
                        type="password"
                    />
                </div>

                <Button type="submit" aria-label="submit">
                    Submit
                </Button>
            </Form>
        </section>
    );
}
