import React, { useState } from "react";

import NextBtn from "../ListProperties/NextBtn";
import PrevBtn from "../ListProperties/PrevBtn";
import SubmitBtn from "../ListProperties/SubmitBtn";

function showBtns({
  propertyDetails,
  handleLocation,
  handleRentAndBilling,
  handlePropertyFeaturesSubmit,
  handleRulesAndResSubmit,
  handleContactInfo,
  handleMedias,
}) {
  return (
    <div className="nextPrevSubmitBtns">
      <div className="nextBtn">
        <NextBtn
          propertyDetails={propertyDetails}
          handleLocation={handleLocation}
          handleRentAndBilling={handleRentAndBilling}
          handlePropertyFeaturesSubmit={handlePropertyFeaturesSubmit}
          handleRulesAndResSubmit={handleRulesAndResSubmit}
          handleContactInfo={handleContactInfo}
          handleMedias={handleMedias}
        />
      </div>
      <div className="prevBtn">
        <PrevBtn />
      </div>
      <div className="submitBtn">
        <SubmitBtn />
      </div>
    </div>
  );
}

export default showBtns;
