import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { getAllDepartments, getAllEmployees } from "../../services/EmployeeServices";
import { useQuery } from "react-query";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ErrMsg from "../../components/ErrMsg/ErrMsg";
import { Link, useNavigate } from "react-router-dom";
import EmployeesList from "../../components/EmployeesList/EmployeesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faArrowAltCircleLeft,
  faArrowLeft,
  faArrowRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { show } from "../../features/Notifcations/NotificationSlice";

import { RootState } from "../../app/store";
import {
  nextPage,
  previousPage,
  setPage,
  updateFilterParams,
  updateTotalNumberOfPages,
} from "../../features/QueryParams/QueryParamsSlice";
import { isAdmin } from "../../features/Auth/AuthSlice";
import { setDepartments } from "../../features/Departments/DepartmentsSlice";
import { toTitleCase } from "../../services/utility";
import ReportCard from "../../components/ReportCard/ReportCard";
import { ReportEntry } from "../../services/APIResponseInterface";
import { getContractReport, getDepartmentReport, getEmploymentReport } from "../../services/ReportingServices";

const ReportsPage = () => {
  const inputStyleClass =
    "p-1 border border-cyan-900 focus:outline-none focus:border-teal-400 focus:ring-2  max-w-1/2 w-80";

  const inputWrapperStyleClass = "flex flex-col justify-center items-center";
  const sectionHeadingStyleClass =
    "px-2 text-md font-bold text-cyan-900 uppercase";
  const checkBoxGroupStyleClass = "px-1 py-2";
  const checkBoxStyleClass = "m-1";
  const formRef = useRef<HTMLFormElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { authenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  if (!authenticated) {
    dispatch(show("Unauthorised Access"));
    return <ErrMsg />;
  }
  
  const [contractReport,setContractReport] = useState<any[]>([]);
  const [departmentReport,setDepartmentReport] = useState<any[]>([]);
  const [employmentReport,setEmploymentReport] = useState<any[]>([]);
  const [isLoading,setIsLoading] = useState(false);
  const [isError,setIsError] = useState(false);

  useEffect(()=>{
    setIsLoading(true);
    setIsError(false);
    const promises = [
      getEmploymentReport(),
      getContractReport(),
      getDepartmentReport(),
    ];

    Promise.all(promises)
    .then((results) => {
      setEmploymentReport(results[0]);
      setContractReport(results[1]);
      setDepartmentReport(results[2]);
    })
    .catch((error) => {
      setIsError(true);  
      dispatch(show("Something went wrong. Could not load reports."));

    }) .finally((()=>setIsLoading(false)));
    
  },[]);

    return(
    <div className="bg-gray-200">
        <Link
        className="text-cyan-500 text-3xl py-5 px-2"
        title="Go Back"
        to="/dashboard"
      >
        <FontAwesomeIcon icon={faArrowAltCircleLeft} />
      </Link>
      <h1 className="py-2 text-2xl font-bold text-cyan-900 uppercase ">
          Employees Reports
      </h1>
      {isLoading && <LoadingSpinner />}
      {!isLoading && !isError && contractReport.length > 0 && <><h6>Total Employees: {contractReport[0]["count"]+contractReport[1]["count"]}</h6><div className="flex p-5"><ReportCard key="contract" data={contractReport} report_type={"contract_type"}/>
      <ReportCard key="department" data={departmentReport} report_type={"department"}/>
      <ReportCard  key="employment" data={employmentReport} report_type={"employment_type"}/>
      </div></>
    }
      
     </div>
    )
};

export default ReportsPage;
