import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { hide } from "../../features/Notifcations/NotificationSlice";

const ErrMsg = () => {
  const { display, message } = useSelector(
    (state: RootState) => state.notificaton
  );
  const dispatch = useDispatch();
  return (
    display && (
      <div
        data-testid="error"
        className="block fixed h-fit bg-sky-100 rounded-lg w-fit px-10 py-10  right-12 bottom-10 border"
      >
        <FontAwesomeIcon
          className="hover:text-cyan-900 p-2 absolute top-0 right-0 text-teal-500 text-right"
          icon={faXmark}
          onClick={() => dispatch(hide())}
        ></FontAwesomeIcon>
        <p className="text-center text-slate-600">{message}</p>
      </div>
    )
  );
};

export default ErrMsg;
