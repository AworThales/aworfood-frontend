import React from "react";


const LoadingSpinner = () => {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex flex-column gap-3" style={{ width: "13rem" }}>
        <div className="placeholder-glow">
          <div className="bg-secondary placeholder col-12" style={{ height: "8rem", width: "100%" }}></div>
        </div>
        <div className="placeholder-glow">
          <div className="bg-secondary placeholder col-6" style={{ height: "1rem" }}></div>
        </div>
        <div className="placeholder-glow">
          <div className="bg-secondary placeholder col-12" style={{ height: "1rem" }}></div>
        </div>
        <div className="placeholder-glow">
          <div className="bg-secondary placeholder col-12" style={{ height: "1rem" }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
