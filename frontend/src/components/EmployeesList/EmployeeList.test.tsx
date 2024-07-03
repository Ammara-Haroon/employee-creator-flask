import { render, screen, waitFor } from "@testing-library/react";
import EmployeesList from "./EmployeesList";
import { BrowserRouter } from "react-router-dom";
import {
  AuthState,
  ContractType,
  Department,
  Employee,
  EmploymentType,
} from "../../services/APIResponseInterface";
//import { QueryClientProvider } from "react-query";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import axios, { AxiosResponse } from "axios";
import { vi } from "vitest";
import { updateAuthState } from "../../features/Auth/AuthSlice";
import userEvent from "@testing-library/user-event";

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

const mockEmployees: Employee[] = [
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
];

describe("Employee List Tests", () => {
  it("Should call axios delete function when any delete button is clicked", async () => {
    const success: AuthState = {
      authenticated: true,
      authorities: ["ROLE_ADMIN"],
      name: "user",
    };
    store.dispatch(updateAuthState(success));
    const mAxiosResponse = {
      data: null,
    } as AxiosResponse;
    const spyDeleteAxios = vi.spyOn(axios, "delete");

    spyDeleteAxios.mockResolvedValue(mAxiosResponse);
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <EmployeesList employeesList={mockEmployees} />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );

    const deleteBtns = screen.getAllByTestId("deleteBtn");
    const user = userEvent.setup();
    await deleteBtns.forEach(async (btn) => await user.click(btn));
    waitFor(() =>
      expect(spyDeleteAxios).toHaveBeenCalledTimes(deleteBtns.length)
    );
  });

  it("Should display all given employees", async () => {
    const success: AuthState = {
      authenticated: true,
      authorities: ["ROLE_ADMIN"],
      name: "user",
    };
    store.dispatch(updateAuthState(success));
    const mAxiosResponse = {
      data: null,
    } as AxiosResponse;
    const spyDeleteAxios = vi.spyOn(axios, "delete");

    spyDeleteAxios.mockResolvedValue(mAxiosResponse);
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <EmployeesList employeesList={mockEmployees} />
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );

    mockEmployees.forEach(async (emp) => {
      const fname = await screen.findByText(emp.firstName);
      const lname = await screen.findByText(emp.lastName);

      expect(fname).toBeInTheDocument();
      expect(lname).toBeInTheDocument();
    });
  });
});
