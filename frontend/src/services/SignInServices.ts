import { AuthState } from "./APIResponseInterface";
import axios from "axios";
import { SERVER_URL } from "./api-config";
 
export interface SignInInfo {
  username: string;
  password: string;
 
}
export const signIn = async (
  data: SignInInfo,token:any
): Promise<AuthState> => {
  //axios.defaults.headers.common['X-XSRF-TOKEN'] = token;
  //axios.defaults.withCredentials=true;
  let response;
  try {
    response = await axios.post(SERVER_URL + "/login",data);
  } catch(error:any) {
    if (error?.response?.status === 403) {
      throw new Error("Access Denied");
    } else if (error) {
      throw new Error("Bad Username or Password.");
    }
  }
if (!response?.data.authenticated) {
  throw new Error("Access Denied. Bad Username or Password");
}
  return response.data;
 };

export const getCSRF = async () => {
    await axios.get(SERVER_URL+'/csrf');
};
