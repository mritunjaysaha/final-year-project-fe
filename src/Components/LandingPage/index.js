import { Form } from "../Forms";
import { FormInput } from "../Forms/formInput";

export function LandingPage() {
    const initialValues = {
        username: "",
        password: "",
    };

    return (
        <Form
            submit={() => {
                console.log("submit clicked");
            }}
            initialValues={initialValues}
        >
            <FormInput name="username" />
            <FormInput name="password" type="password" />
        </Form>
    );
}
