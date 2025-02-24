import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementStep } from "../../faetures/PropertyForm/stepSlice";

function PrevBtn() {
  const step = useSelector((state) => state.step);
  const dispatch = useDispatch();
  return (
    <>
      {step > 1 && (
        <button
          type="button"
          className="previewButton"
          onClick={() => dispatch(decrementStep(step - 1))}
        >
          Preview
        </button>
      )}
    </>
  );
}

export default PrevBtn;
