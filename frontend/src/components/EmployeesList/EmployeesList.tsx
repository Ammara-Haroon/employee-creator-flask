import { Employee, SortType } from "../../services/APIResponseInterface";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import {  useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteEmployee } from "../../services/EmployeeServices";
import { isAdmin } from "../../features/Auth/AuthSlice";
import { toggleSort } from "../../features/QueryParams/QueryParamsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

const EmployeesList = ({ employeesList }: { employeesList: Employee[] }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const roleAdmin = isAdmin();
  const dispatch = useDispatch();
  const { sort } = useSelector((state: RootState) => state.queryParams);

  const mutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: "employees" }),
  });
  const handleEditEmployee = (employee: Employee) => {
    navigate("/edit", { state: { employeeData: employee } });
  };
  const handleDeleteEmployee = (id: number) => {
    mutation.mutate(id);
  };
  return (
    <>
      <table className="table-fixed border w-full  border-black">
        <thead className="bg-teal-500  text-slate-900">
          <tr>
            <th className="flex items-center uppercase p-2">
              <span className="px-1">Employee Name</span>
              <button
                onClick={() => dispatch(toggleSort())}
                className="text-xs text-wrap leading-none w-5 border border-cyan-900 py-1 px-0.5 bg-cyan-900 rounded-lg hover:text-teal-100"
              >
                {sort === SortType.ASC ? "A ▼ Z" : "Z ▼ A"}
              </button>
            </th>
            <th className="uppercase hidden sm:table-cell">Role</th>
            <th className="uppercase  hidden sm:table-cell">Department</th>
            {roleAdmin && <th className="uppercase"></th>}
          </tr>
        </thead>
        {employeesList.length > 0 && (
          <tbody>
            {employeesList.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                handleEdit={handleEditEmployee}
                handleDelete={handleDeleteEmployee}
              />
            ))}
          </tbody>
        )}
      </table>
      {employeesList.length === 0 && (
        <p className="text-slate-800 text-center">No data to display.</p>
      )}
    </>
  );
};

export default EmployeesList;
