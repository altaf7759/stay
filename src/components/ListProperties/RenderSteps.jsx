import React, { useState } from "react";

import PropertyDetails from "./PropertyDetails";
import LocationDetails from "./LocationDetails";
import PropertyFeatures from "./PropertyFeatures";
import RentAndBilling from "./RentAndBilling";
import RulesAndRestrictions from "./RulesAndRestrictions";
import ContactInfo from "./ContactInfo";
import ImagesAndMedias from "./ImagesAndMedias";
import FormPreview from "./FormPreview";
import { useSelector } from "react-redux";

const showBtns = () => {
  const step = useSelector((state) => state.step);
  switch (step) {
    case 1:
      return <PropertyDetails />;
    case 2:
      return <LocationDetails />;
    case 3:
      return <RentAndBilling />;
    case 4:
      return <PropertyFeatures />;
    case 5:
      return <RulesAndRestrictions />;
    case 6:
      return <ContactInfo />;
    case 7:
      return <ImagesAndMedias />;
    case 8:
      return <FormPreview />;
    default:
      return <PropertyDetails />;
  }
};

export default showBtns;
