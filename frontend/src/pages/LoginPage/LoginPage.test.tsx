import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import LoginPage from "./LoginPage";
import {
  BrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import * as LoginServices from "../../services/SignInServices";

describe("Login Page Tests", () => {
 
  it("Should display error message if login username and password is incorrect", async () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    vi.spyOn(LoginServices,"getCSRF").mockResolvedValue();
    vi.spyOn(LoginServices,"signIn").mockRejectedValue(new Error());
    const username = screen.getByLabelText(/username/i);
    const password = screen.getByLabelText(/password/i);
    const btn = screen.getByText(/sign/i);
    const user = userEvent.setup();
    await user.type(username, "wrong-user");
    await user.type(password, "wrong-password");
    await user.click(btn);
    const err = await screen.findByTestId(/error/i);
    expect(err).toBeInTheDocument();
  });
});
