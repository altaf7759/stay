import React from "react";
import { useSelector } from "react-redux";

function SubmitBtn() {
  const step = useSelector((state) => state.step);
  return (
    <>
      {step == 8 && (
        <button type="submit" className="submitButton">
          Submit
        </button>
      )}
    </>
  );
}

export default SubmitBtn;
