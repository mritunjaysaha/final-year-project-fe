import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LandingPage } from "./index";

test("Landing page", () => {
    const { container } = render(<LandingPage />);
    console.log(container.firstChild);

    const loginBtn = screen.getByRole("button", { name: /log in/i });
    const emailTextBox = screen.getByLabelText(/email/i);
    const passwordTextBox = screen.getByLabelText(/password/i);

    userEvent.type(emailTextBox, "test");
    userEvent.type(passwordTextBox, "123456");

    screen.debug();

    expect(loginBtn).toHaveTextContent("Log In");
});
