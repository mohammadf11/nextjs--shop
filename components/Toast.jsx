import React from "react";

const Toast = ({ text , handleHide , color }) => {
  return (
    <div className={`toast show bg-${color}`} data-autohide="false">
      <div className={`toast-header d-flex justify-content-between bg-${color}`}>
        <strong className="mr-auto text-white">{color=='danger'?'Error':'Success'}</strong>
        <button
          type="button"
          className="close"
          style={{color:'white', background:'transparent',border:'none' }}
          onClick={handleHide}
          data-dismiss="toast"
        >
          X
        </button>
      </div>
      <div className="toast-body text-white">{text}</div>
    </div>
  );
};

export default Toast;
