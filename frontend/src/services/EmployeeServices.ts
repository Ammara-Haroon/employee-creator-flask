import axios from "axios";
import { QueryParamsState } from "../features/QueryParams/QueryParamsSlice";
import { Department, Employee, EmployeeData, EmployeePageResponse } from "./APIResponseInterface";
import { SERVER_URL } from "./api-config";

export const getQueryParamsString = (
  queryParams: Partial<QueryParamsState>
): string => {
  if (
    (!queryParams.admin && !queryParams.finance && !queryParams.it) ||
    (!queryParams.fullTime && !queryParams.partTime) ||
    (!queryParams.contract && !queryParams.permanent)
  ) {
    return "";
  }
  const searchStr = queryParams.search?.trim();
  const MAX_PER_PAGE = 20
  let queryStr = `page=${(queryParams.currentPage||0)+1}&per_page=${MAX_PER_PAGE}&sort=${queryParams.sort}&name=${searchStr}`;
  queryStr += "&department=";
  if (queryParams.admin) {
    queryStr += `${queryParams.admin},`;
  }
  if (queryParams.finance) {
    queryStr += `${queryParams.finance},`;
  }
  if (queryParams.it) {
    queryStr += `${queryParams.it},`;
  }
  queryStr = queryStr.substring(0, queryStr.length - 1);
  queryStr += "&employmentType=";
  if (queryParams.fullTime) {
    queryStr += `${queryParams.fullTime},`;
  }
  if (queryParams.partTime) {
    queryStr += `${queryParams.partTime},`;
  }
  queryStr = queryStr.substring(0, queryStr.length - 1);
  queryStr += "&contractType=";
  if (queryParams.contract) {
    queryStr += `${queryParams.contract},`;
  }
  if (queryParams.permanent) {
    queryStr += `${queryParams.permanent},`;
  }
  queryStr = queryStr.substring(0, queryStr.length - 1);
  return queryStr;
};
export const getAllEmployees = async (
  queryParams: Partial<QueryParamsState>
): Promise<EmployeePageResponse> => {
  const queryParamsString = getQueryParamsString(queryParams);
  if (queryParamsString.length === 0)
    throw new Error("Nothing found with these filters");
  const response = await axios.get(
    `${SERVER_URL}/employees?${queryParamsString}`
  );
  const data = response.data;
 
  data.content = data.content.map((entry: any) => ({
    ...entry,
    startDate: new Date(entry.startDate),
    finishDate: entry.finishDate && new Date(entry.finishDate),
    contractType: entry.contractType.split(".")[1],
    employmentType: entry.employmentType.split(".")[1]

  }));
  return data;
};

export const createEmployee = async (data: EmployeeData): Promise<Employee> => {
  const response = await axios.post(SERVER_URL + "/employees", data);
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await axios.delete(`${SERVER_URL}/employees/${id}`);
};

export const updateEmployee = async (data: EmployeeData): Promise<Employee> => {
  const response = await axios.put(
    `${SERVER_URL}/employees/${data.id}`,
    data
  );
  return response.data;
};


export const getAllDepartments = async (
): Promise<Department[]> => {
  const response = await axios.get(
    `${SERVER_URL}/departments`
  );
  const data = response.data;
  return data;
};
