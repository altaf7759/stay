import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementStep } from "../../faetures/PropertyForm/stepSlice";

function NextBtn({
  propertyDetails,
  handleLocation,
  handleRentAndBilling,
  handlePropertyFeaturesSubmit,
  handleRulesAndResSubmit,
  handleContactInfo,
  handleMedias,
}) {
  const step = useSelector((state) => state.step);
  const dispatch = useDispatch();

  return (
    <>
      {step < 8 && (
        <button
          type="button"
          className="nextButton"
          onClick={() => {
            if (step == 1) {
              propertyDetails();
            }
            if (step == 2) {
              handleLocation();
            }
            if (step == 3) {
              handleRentAndBilling();
            }
            if (step == 4) {
              handlePropertyFeaturesSubmit();
            }
            if (step == 5) {
              handleRulesAndResSubmit();
            }
            if (step == 6) {
              handleContactInfo();
            }
            if (step == 7) {
              handleMedias();
            }
            dispatch(incrementStep(step + 1));
          }}
        >
          Next
        </button>
      )}
    </>
  );
}

export default NextBtn;
