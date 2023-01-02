import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Loading from "./Loading";
import Toast from "./Toast";
import React from "react";

const Notify = () => {
  const {state, dispatch} = useContext(DataContext);
  const { notify } = state;
  return (
    <div>
      {notify.loading && <Loading/>}
      {notify.error && (
        <Toast
          handleHide={() => dispatch({ type: "NOTIFY", payload: {} })}
          text={notify.error}
          color = "danger"
          

        />
      )}
      {notify.success && (
        <Toast
          handleHide={() => dispatch({ type: "NOTIFY", payload: {} })}
          text={notify.success}
          color = "success"
        />
      )}
    </div>
  );
};

export default Notify;
