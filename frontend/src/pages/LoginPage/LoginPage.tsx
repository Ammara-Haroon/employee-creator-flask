import { FormEvent, useRef } from "react";
import { SignInInfo, getCSRF, signIn } from "../../services/SignInServices";
import { hide, show } from "../../features/Notifcations/NotificationSlice";
import ErrMsg from "../../components/ErrMsg/ErrMsg";
import { useDispatch } from "react-redux";
import { logout, updateAuthState } from "../../features/Auth/AuthSlice";
import { useNavigate } from "react-router-dom";
import { resetFilterParams } from "../../features/QueryParams/QueryParamsSlice";
import { useCookies } from 'react-cookie';

const LoginPage = () => {
const [cookies, setCookie, removeCookie] = useCookies(['XSRF-TOKEN']);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genericInputStyle =
    "p-2 border border-cyan-900 focus:outline-none focus:border-teal-400 focus:ring-2";
  const inputStyleClass = genericInputStyle + " max-w-1/2 w-80";

  const inputWrapperStyleClass = "px-3 flex flex-col";
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(resetFilterParams());
    dispatch(hide());
    
    //getCSRF().then(() => {
      if(formRef.current) {
        const obj = Object.fromEntries(new FormData(formRef.current).entries()
        );
        const signInInfo:SignInInfo = {username:obj["username"].toString(),password:obj["password"].toString()};
        signIn(signInInfo, cookies['XSRF-TOKEN'])
        .then((data) => {
          dispatch(updateAuthState(data));
          if (data.authenticated) {
            dispatch(hide());
            navigate("/dashboard");
          } else {
            dispatch(logout());
            dispatch(show("Login Failed. Bad Username or Password"));
          }
        })
        .catch((e: any) => {
          dispatch(logout());
          dispatch(show(e.message)); //"Login Failed. Bad Username or Password"));
        });
      }
    // })
    // .catch((e: any) => {
    //     dispatch(logout());
    //     dispatch(show(e.message)); //connection error
    // });
  };

  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center border border-black w-screen h-screen">
      <form
        className="px-20 pb-10 text-slate-800 font-semibold  bg-gray-100 border border-cyan-900 ring-8 rounded-lg"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <h1 className="py-10 text-center  text-2xl font-bold text-cyan-900 uppercase">
          Employee Creator
        </h1>
        <div className={inputWrapperStyleClass}>
          <label htmlFor="userName">Username: </label>
          <input
            className={inputStyleClass}
            type="text"
            name="username"
            id="userName"
            required
          />
        </div>
        <div className={inputWrapperStyleClass}>
          <label htmlFor="password">Password: </label>
          <input
            className={inputStyleClass}
            type="password"
            name="password"
            id="password"
            required
          />
        </div>

        <ErrMsg />
        <div className="flex justify-center">
          <button
            className="w-40 hover:bg-teal-500 mt-16-md mt-5 h-fit bg-cyan-800 px-5 py-3 rounded-full uppercase text-gray-200"
            type="submit"
          >
            Sign In
          </button>
        </div>
        </form>
    </div>
  );
};

export default LoginPage;
