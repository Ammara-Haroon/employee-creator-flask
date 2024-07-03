import { userEvent } from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import { store } from "../../app/store";
import { updateAuthState } from "../../features/Auth/AuthSlice";
import { AuthState } from "../../services/APIResponseInterface";
import { render, screen } from "@testing-library/react";
import EmployeeForm from "./EmployeeForm";
import { Mode } from "../../pages/EmployeeFormPage/Mode";
import { setDepartments } from "../../features/Departments/DepartmentsSlice";
import { mockDepartments } from "../../pages/HomePage/HomePage.test";

describe("Employee Form Tests", () => {
  it("Should call the save function for when save button is clicked", async () => {
    const success: AuthState = {
      authenticated: true,
      authorities: ["ROLE_ADMIN"],
      name: "admin",
    };
    store.dispatch(updateAuthState(success));
    store.dispatch(setDepartments(mockDepartments));
    const mockSave = vi.fn(() => {});
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <EmployeeForm
            mode={Mode.ADD}
            saveEmployee={mockSave}
            employee={undefined}
          />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const saveBtn = screen.getByText(/.*save.*/i);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/First Name/i), "John");
    await user.type(screen.getByLabelText(/Last Name/i), "Miller");
    await user.type(screen.getByLabelText(/Email/i), "john@test.com");
    await user.type(screen.getByLabelText(/Mobile Number/i), "0444444444");
    await user.type(screen.getByLabelText(/Address/i), "37 Hill End");
    await user.type(screen.getByLabelText(/Role/i), "CFO");
    await user.type(screen.getByLabelText(/Hours per week/i), "12");

    await user.click(saveBtn);
    expect(mockSave).toHaveBeenCalled();
  });

  it("Should not call save if first name is missing", async () => {
    const mockSave = vi.fn(() => {});
    store.dispatch(setDepartments(mockDepartments));

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <EmployeeForm
            mode={Mode.ADD}
            saveEmployee={mockSave}
            employee={undefined}
          />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const saveBtn = screen.getByText(/.*save.*/i);
    const user = userEvent.setup();
    //await user.type(screen.getByLabelText(/.*First.*/i), "John");
    await user.type(screen.getByLabelText(/Last Name/i), "Miller");
    await user.type(screen.getByLabelText(/Email/i), "john@test.com");
    await user.type(screen.getByLabelText(/Mobile Number/i), "0444444444");
    await user.type(screen.getByLabelText(/Address/i), "37 Hill End");
    await user.type(screen.getByLabelText(/Role/i), "CFO");
    await user.type(screen.getByLabelText(/Hours per week/i), "12");

    await user.click(saveBtn);

    expect(mockSave).not.toHaveBeenCalled();
  });
  it("Should not call save if last name is missing", async () => {
    const mockSave = vi.fn(() => {});
    store.dispatch(setDepartments(mockDepartments));
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <EmployeeForm
            mode={Mode.ADD}
            saveEmployee={mockSave}
            employee={undefined}
          />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const saveBtn = screen.getByText(/.*save.*/i);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/.*First.*/i), "John");
    //await user.type(screen.getByLabelText(/Last Name/i), "Miller");
    await user.type(screen.getByLabelText(/Email/i), "john@test.com");
    await user.type(screen.getByLabelText(/Mobile Number/i), "0444444444");
    await user.type(screen.getByLabelText(/Address/i), "37 Hill End");
    await user.type(screen.getByLabelText(/Role/i), "CFO");
    await user.type(screen.getByLabelText(/Hours per week/i), "12");

    await user.click(saveBtn);

    expect(mockSave).not.toHaveBeenCalled();
  });

  it("Should not call save if email is missing or incorrect", async () => {
    const mockSave = vi.fn(() => {});
    store.dispatch(setDepartments(mockDepartments));
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <EmployeeForm
            mode={Mode.ADD}
            saveEmployee={mockSave}
            employee={undefined}
          />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const saveBtn = screen.getByText(/.*save.*/i);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/.*First.*/i), "John");
    await user.type(screen.getByLabelText(/Last Name/i), "Miller");
    //await user.type(screen.getByLabelText(/Email/i), "john@test.com");
    await user.type(screen.getByLabelText(/Mobile Number/i), "0444444444");
    await user.type(screen.getByLabelText(/Address/i), "37 Hill End");
    await user.type(screen.getByLabelText(/Role/i), "CFO");
    await user.type(screen.getByLabelText(/Hours per week/i), "12");

    await user.click(saveBtn);

    await user.type(screen.getByLabelText(/Email/i), "xxx");
    await user.click(saveBtn);

    expect(mockSave).not.toHaveBeenCalled();
  });

  it("Should not call save if mobile number is missing or incorrect", async () => {
    const mockSave = vi.fn(() => {});
    store.dispatch(setDepartments(mockDepartments));
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <EmployeeForm
            mode={Mode.ADD}
            saveEmployee={mockSave}
            employee={undefined}
          />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const saveBtn = screen.getByText(/.*save.*/i);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/.*First.*/i), "John");
    await user.type(screen.getByLabelText(/Last Name/i), "Miller");
    await user.type(screen.getByLabelText(/Email/i), "john@test.com");
    //await user.type(screen.getByLabelText(/Mobile Number/i), "0444444444");
    await user.type(screen.getByLabelText(/Address/i), "37 Hill End");
    await user.type(screen.getByLabelText(/Role/i), "CFO");
    await user.type(screen.getByLabelText(/Hours per week/i), "12");

    await user.click(saveBtn);

    await user.type(screen.getByLabelText(/Mobile Number/i), "xxx");
    await user.click(saveBtn);

    expect(mockSave).not.toHaveBeenCalled();
  });

  it("Should not call save if address is missing", async () => {
    const mockSave = vi.fn(() => {});
    store.dispatch(setDepartments(mockDepartments));
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <EmployeeForm
            mode={Mode.ADD}
            saveEmployee={mockSave}
            employee={undefined}
          />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const saveBtn = screen.getByText(/.*save.*/i);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/.*First.*/i), "John");
    await user.type(screen.getByLabelText(/Last Name/i), "Miller");
    await user.type(screen.getByLabelText(/Email/i), "john@test.com");
    await user.type(screen.getByLabelText(/Mobile Number/i), "0444444444");
    //await user.type(screen.getByLabelText(/Address/i), "37 Hill End");
    await user.type(screen.getByLabelText(/Role/i), "CFO");
    await user.type(screen.getByLabelText(/Hours per week/i), "12");

    await user.click(saveBtn);

    expect(mockSave).not.toHaveBeenCalled();
  });
  it("Should not call save if role is missing", async () => {
    const mockSave = vi.fn(() => {});
    store.dispatch(setDepartments(mockDepartments));
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <EmployeeForm
            mode={Mode.ADD}
            saveEmployee={mockSave}
            employee={undefined}
          />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const saveBtn = screen.getByText(/.*save.*/i);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/.*First.*/i), "John");
    await user.type(screen.getByLabelText(/Last Name/i), "Miller");
    await user.type(screen.getByLabelText(/Email/i), "john@test.com");
    await user.type(screen.getByLabelText(/Mobile Number/i), "0444444444");
    await user.type(screen.getByLabelText(/Address/i), "37 Hill End");
    //await user.type(screen.getByLabelText(/Role/i), "CFO");
    await user.type(screen.getByLabelText(/Hours per week/i), "12");

    await user.click(saveBtn);

    expect(mockSave).not.toHaveBeenCalled();
  });
  it("Should not call save if hrs per week is missing or incorrect", async () => {
    const mockSave = vi.fn(() => {});
    store.dispatch(setDepartments(mockDepartments));
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <EmployeeForm
            mode={Mode.ADD}
            saveEmployee={mockSave}
            employee={undefined}
          />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const saveBtn = screen.getByText(/.*save.*/i);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/.*First.*/i), "John");
    await user.type(screen.getByLabelText(/Last Name/i), "Miller");
    await user.type(screen.getByLabelText(/Email/i), "john@test.com");
    await user.type(screen.getByLabelText(/Mobile Number/i), "0444444444");
    await user.type(screen.getByLabelText(/Address/i), "37 Hill End");
    await user.type(screen.getByLabelText(/Role/i), "CFO");
    //await user.type(screen.getByLabelText(/Hours per week/i), "12");

    await user.click(saveBtn);

    await user.type(screen.getByLabelText(/Hours per week/i), "-9");
    await user.click(saveBtn);

    expect(mockSave).not.toHaveBeenCalled();
  });
});
