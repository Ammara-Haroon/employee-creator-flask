import { BrowserRouter } from "react-router-dom";
import EmployeeCard from "./EmployeeCard";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ContractType,
  EmploymentType,
  AuthState,
  Employee,
  Department,
} from "../../services/APIResponseInterface";
import { vi } from "vitest";
import { updateAuthState } from "../../features/Auth/AuthSlice";

const mockDept:Department = {
  id:1,
  name:"ADMIN"
}
const mockEmployee:Employee = {
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
  department_id: mockDept.id,
  department_name: mockDept.name,
  role: "Chief Hospitality Supervisor",
};
describe("Employee Card Tests", () => {
  it("Should not display edit delete buttons for a normal user", async () => {
    const mockDelete = vi.fn(() => {});
    const mockEdit = vi.fn(() => {});

    const success: AuthState = {
      authenticated: true,
      authorities: ["ROLE_USER"],
      name: "user",
    };
    store.dispatch(updateAuthState(success));
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <table>
            <tbody>
              <EmployeeCard
                employee={mockEmployee}
                handleEdit={mockEdit}
                handleDelete={mockDelete}
              />
            </tbody>
          </table>
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const deleteBtn = screen.queryByTestId("deleteBtn");
    const editBtn = screen.queryByTestId("editBtn");

    expect(deleteBtn).toBeNull;
    expect(editBtn).toBeNull;
  });

  it("Should call delete when delete button is clicked", async () => {
    const mockDelete = vi.fn(() => {});
    const mockEdit = vi.fn(() => {});

    const success: AuthState = {
      authenticated: true,
      authorities: ["ROLE_ADMIN"],
      name: "user",
    };
    store.dispatch(updateAuthState(success));
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <table>
            <tbody>
              <EmployeeCard
                employee={mockEmployee}
                handleEdit={mockEdit}
                handleDelete={mockDelete}
              />
            </tbody>
          </table>
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const deleteBtn = screen.getByTestId("deleteBtn");
    const user = userEvent.setup();
    await user.click(deleteBtn);

    expect(mockDelete).toHaveBeenCalled();
  });

  it("Should call eidt when delete button is clicked", async () => {
    const mockDelete = vi.fn(() => {});
    const mockEdit = vi.fn(() => {});
    const success: AuthState = {
      authenticated: true,
      authorities: ["ROLE_ADMIN"],
      name: "user",
    };
    store.dispatch(updateAuthState(success));
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <table>
            <tbody>
              <EmployeeCard
                employee={mockEmployee}
                handleEdit={mockEdit}
                handleDelete={mockDelete}
              />
            </tbody>
          </table>
        </Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    );
    const editBtn = screen.getByTestId("editBtn");
    const user = userEvent.setup();
    await user.click(editBtn);

    expect(mockEdit).toHaveBeenCalled();
  });
});
