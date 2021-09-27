import axios from "axios";

import { Form } from "../Forms";
import { FormInput } from "../Forms/formInput";

export function LandingPage() {
    const initialValues = {
        email: "teacher@test.com",
        password: "123456",
    };

    async function handleSubmit(form) {
        console.log(form);

        await axios
            .post(`/api/login`, form)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

    return (
        <Form submit={handleSubmit} initialValues={initialValues}>
            <FormInput name="email" type="email" label="E-mail" />
            <FormInput name="password" type="password" label="Password" />
        </Form>
    );
}
