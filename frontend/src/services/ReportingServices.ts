import axios from "axios";
import { SERVER_URL } from "./api-config";
import { ReportEntry } from "./APIResponseInterface";

export const getContractReport = async ():Promise<ReportEntry[]> => {
  const response = await axios.get(`${SERVER_URL}/report_contract` );
  return response.data;
};

export const getDepartmentReport = async ():Promise<ReportEntry[]> => {
  const response = await axios.get(`${SERVER_URL}/report_department` );
  return response.data;
};

export const getEmploymentReport = async ():Promise<ReportEntry[]> => {
  const response = await axios.get(`${SERVER_URL}/report_employment_type` );
  return response.data;
};
