import { render, screen } from "@testing-library/react";
import { store } from "../../app/store";
import { updateAuthState } from "../../features/Auth/AuthSlice";
import { AuthState } from "../../services/APIResponseInterface";
import EmployeeFormPage from "./EmployeeFormPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { setDepartments } from "../../features/Departments/DepartmentsSlice";
import { mockDepartments } from "../HomePage/HomePage.test";

describe("Employee Form Page Authentication Tests", () => {
  it("Should show an error if incorrect authetication is used", async () => {
    const failure: AuthState = {
      authenticated: false,
      authorities: [],
      name: "random",
    };
    store.dispatch(updateAuthState(failure));
    store.dispatch(setDepartments(mockDepartments));

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <EmployeeFormPage />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );

    const err = await screen.findByTestId(/error/i);
    expect(err).toBeInTheDocument();
  });

  it("Should display error if user has the role 'ROLE_USER'", async () => {
    const success: AuthState = {
      authenticated: true,
      authorities: ["ROLE_USER"],
      name: "user",
    };
    store.dispatch(updateAuthState(success));
    store.dispatch(setDepartments(mockDepartments));

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <EmployeeFormPage />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );

    const err = await screen.findByTestId(/error/i);
    expect(err).toBeInTheDocument();
  });

  it("Should display the page correctly if user has the role 'ROLE_ADMIN'", async () => {
    const success: AuthState = {
      authenticated: true,
      authorities: ["ROLE_ADMIN"],
      name: "admin",
    };
    store.dispatch(updateAuthState(success));
    store.dispatch(setDepartments(mockDepartments));

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <EmployeeFormPage />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const heading = await screen.findByText(/EMPLOYEE DETAILS/i);
    expect(heading).toBeInTheDocument();
  });
});

