import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "./HomePage";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "../../app/store";
import { updateAuthState } from "../../features/Auth/AuthSlice";
import {
  AuthState,
  ContractType,
  Department,
  EmployeePageResponse,
  EmploymentType,
} from "../../services/APIResponseInterface";
import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "react-query";
import EmployeeFormPage from "../EmployeeFormPage/EmployeeFormPage";
import * as EmployeeServices from "../../services/EmployeeServices";
import userEvent from "@testing-library/user-event";
import { setDepartments } from "../../features/Departments/DepartmentsSlice";

const mockAdmin:Department = {
  id:1,
  name:"ADMIN"
}
const mockFinance:Department = {
  id:2,
  name:"FINANCE"
}
const mockIT:Department = {
  id:3,
  name:"IT"
}

export const mockDepartments = [mockAdmin,mockFinance,mockIT];

const mockPage: EmployeePageResponse = {
  has_next: false,
  has_prev: false,
  totalPages: 1,
  content: [
    {
      id: 387,
      firstName: "Arron",
      middleName: "Cary",
      lastName: "Gerlach",
      email: "Arron@xmail.com",
      mobileNumber: "0410777159",
      address: "41411 Graham Springs",
      contractType: ContractType.PERMANENT,
      startDate: new Date("2024-04-25"),
      finishDate: null,
      employmentType: EmploymentType.FULL_TIME,
      hoursPerWeek: 38,
       department_id: mockFinance.id,
      department_name: mockFinance.name,
      role: "Chief Hospitality Supervisor",
    },
    {
      id: 330,
      firstName: "Bryon",
      middleName: "Tawny",
      lastName: "Williamson",
      email: "Bryon@xmail.com",
      mobileNumber: "0412033706",
      address: "762 Neida Shoals",
      contractType: ContractType.PERMANENT,
      startDate: new Date("2024-02-23"),
      finishDate: null,
      employmentType: EmploymentType.FULL_TIME,
      hoursPerWeek: 30,
       department_id: mockFinance.id,
      department_name: mockFinance.name,
      role: "Customer Strategist",
    },
    {
      id: 373,
      firstName: "Cristobal",
      middleName: "Sherman",
      lastName: "McLaughlin",
      email: "Cristobal@xmail.com",
      mobileNumber: "0418782952",
      address: "581 Maria Parkway",
      contractType: ContractType.PERMANENT,
      startDate: new Date("2023-07-31"),
      finishDate: null,
      employmentType: EmploymentType.FULL_TIME,
      hoursPerWeek: 31,
       department_id: mockFinance.id,
      department_name: mockFinance.name,
      role: "Customer Supervisor",
    },
    {
      id: 384,
      firstName: "Palma",
      middleName: "Tamisha",
      lastName: "Windler",
      email: "Palma@xmail.com",
      mobileNumber: "0412266811",
      address: "118 Stamm Squares",
      contractType: ContractType.PERMANENT,
      startDate: new Date("2023-06-10"),
      finishDate: null,
      employmentType: EmploymentType.FULL_TIME,
      hoursPerWeek: 34,
       department_id: mockFinance.id,
      department_name: mockFinance.name,
      role: "Community-Services Producer",
    },
  ],
};
describe("Employee Dashboard Authentication Tests", () => {
  it("Should display an error message when trying to load page without authentication", async () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    const err = await screen.findByTestId(/error/i);
    expect(err).toBeInTheDocument();
  });
  it("Should load dashboard when user is authenticated", async () => {
    const success: AuthState = {
      authenticated: true,
      authorities: ["ROLE-USER"],
      name: "user",
    };
    store.dispatch(updateAuthState(success));
    
    vi.spyOn(EmployeeServices, "getAllEmployees").mockResolvedValue(mockPage);
    vi.spyOn(EmployeeServices, "getAllDepartments").mockResolvedValue(mockDepartments);
    
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const dash = await screen.findByText(/dashboard/i)
    expect(dash).toBeInTheDocument();
  });

  it("Should not show add, delete or edit buttons to a user who is not an admin", async () => {
    const success: AuthState = {
      authenticated: true,
      authorities: ["ROLE_USER"],
      name: "user",
    };
     store.dispatch(updateAuthState(success));

    vi.spyOn(EmployeeServices, "getAllEmployees").mockResolvedValue(mockPage);
    vi.spyOn(EmployeeServices, "getAllDepartments").mockResolvedValue(mockDepartments);
    
   
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    await screen.findAllByText(/arron/i);
    const addBtn = screen.queryByText(/add/i);
    expect(addBtn).toBeNull();
    const editBtns = screen.queryAllByTestId(/edit/);
    expect(editBtns.length).toBe(0);
    const deleteBtns = screen.queryAllByTestId(/delete/);
    expect(deleteBtns.length).toBe(0);
  });
  it("Should show add, delete or edit buttons to a user who is an admin", async () => {
    const success: AuthState = {
      authenticated: true,
      authorities: ["ROLE_ADMIN"],
      name: "admin",
    };
    store.dispatch(updateAuthState(success));

    vi.spyOn(EmployeeServices, "getAllEmployees").mockResolvedValue(mockPage);
    vi.spyOn(EmployeeServices, "getAllDepartments").mockResolvedValue(mockDepartments);
    
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const addBtn = await screen.findByTitle("Add New Employee");
    expect(addBtn).not.toBeNull();
    const editBtns = await screen.findAllByTestId(/edit/);
    expect(editBtns.length).toBeGreaterThan(0);
    const deleteBtns = await screen.findAllByTestId(/delete/);
    expect(deleteBtns.length).toBeGreaterThan(0);
  });
});

describe("Employee User Interaction Tests", () => {
  it("Should open add user form when add new employee button is clicked", async () => {
    const success: AuthState = {
      authenticated: true,
      authorities: ["ROLE_ADMIN"],
      name: "user",
    };
    store.dispatch(updateAuthState(success));
    store.dispatch(setDepartments(mockDepartments));

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<EmployeeFormPage />} />
          </Routes>
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const user = userEvent.setup();
    const addBtn = screen.getByText(/add/i);
    await user.click(addBtn);
    const heading = await screen.findByText(/EMPLOYEE DETAILS/i);
    expect(heading).toBeInTheDocument();
  });

  it("Should reset filters when reset button is clicked", async () => {
    const success: AuthState = {
      authenticated: true,
      authorities: ["ROLE_ADMIN"],
      name: "user",
    };
    store.dispatch(updateAuthState(success));
    store.dispatch(setDepartments(mockDepartments));

    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const user = userEvent.setup();
    const resetBtn = screen.getByText(/reset/i);
    const checkboxes = screen.getAllByRole("checkbox");

    checkboxes.forEach((check) => user.click(check));
    await user.click(resetBtn);
    checkboxes.forEach((check) => expect(check).toBeChecked());
  });

  it("Should search with corrrect query and filter parameters", async () => {
    const success: AuthState = {
      authenticated: true,
      authorities: ["ROLE_ADMIN"],
      name: "user",
    };
    store.dispatch(updateAuthState(success));

    vi.spyOn(EmployeeServices, "getAllEmployees").mockResolvedValue(mockPage);
    vi.spyOn(EmployeeServices, "getAllDepartments").mockResolvedValue(mockDepartments);
    
    const spyGetEmployee = vi.spyOn(EmployeeServices, "getAllEmployees");
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const user = userEvent.setup();
    const searchBtn = screen.getByText("Search");
    //uncheck  few options
    const admin = screen.getByLabelText(/Admin/i);
    await user.click(admin);
    const contract = screen.getByLabelText(/contract/i);
    await user.click(contract);
    const fulltime = screen.getByLabelText(/full-time/i);
    await user.click(fulltime);

    const input = screen.getByLabelText(/search for/i);
    await user.type(input, "John");
    await user.click(searchBtn);
    expect(spyGetEmployee).toHaveBeenCalled();
    
    const expectedArgs = {
      currentPage: 0,
      totalNumberOfPages: 1,
      admin: undefined,
      contract: undefined,
      finance: "FINANCE",
      fullTime: undefined,
      it: "IT",
      partTime: "PART_TIME",
      permanent: "PERMANENT",
      search: "John",
      sort: "ASC",
    };

    expect(
      spyGetEmployee.mock.calls[spyGetEmployee.mock.calls.length - 1][0]
    ).toStrictEqual(expectedArgs);
  });
});
