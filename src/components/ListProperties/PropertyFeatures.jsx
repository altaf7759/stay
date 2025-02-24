import React, { Profiler, useEffect, useState } from "react";

import ShowBtns from "./ShowBtns";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyFeatures } from "../../faetures/PropertyForm/PropertySlice";
import { setStep } from "../../faetures/PropertyForm/stepSlice";

function PropertyFeatures() {
  const property = useSelector((state) => state.property);
  const step = useSelector((state) => state.step);
  const dispatch = useDispatch();
  const [propertyFeature, setPropertyFeature] = useState({
    furnishingStatus: "",
    occupancyType: "",
    parking: "No",
    cctv: "No",
    laundry: "No",
    ac: "No",
    cooler: "No",
    geyser: "No",
    gym: "No",
    lift: "No",
    powerBackup: "No",
  });

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;

    setPropertyFeature((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "Yes" : "No") : value,
    }));
  };

  const handlePropertyFeatures = () => {
    const { furnishingStatus, occupancyType } = propertyFeature;
    const furnishingStatusError = document.querySelector(
      ".furnishingStatusError"
    );
    const occupancyTypeError = document.querySelector(".occupancyTypeError");
    let isValid = true;

    if (!furnishingStatus) {
      furnishingStatusError.innerHTML = "Please select furnishing status";
      isValid = false;
    } else {
      furnishingStatusError.innerHTML = "";
    }

    if (!occupancyType) {
      occupancyTypeError.innerHTML = "Please select occupancy type";
      isValid = false;
    } else {
      occupancyTypeError.innerHTML = "";
    }

    return isValid;
  };

  const handlePropertyFeaturesSubmit = () => {
    if (handlePropertyFeatures()) {
      dispatch(
        setPropertyFeatures({
          furnishingStatus: propertyFeature.furnishingStatus || "",
          occupancyType: propertyFeature.occupancyType || "",
          parking: propertyFeature.parking || "",
          cctv: propertyFeature.cctv || "",
          ac: propertyFeature.ac || "",
          cooler: propertyFeature.cooler || "",
          laundry: propertyFeature.laundry || "",
          geyser: propertyFeature.geyser || "",
          gym: propertyFeature.gym || "",
          lift: propertyFeature.gym || "",
          powerBackup: propertyFeature.powerBackup || "",
          isPropertyFeatures: true,
        })
      );
    } else {
      dispatch(setStep(step - 1));
    }
  };

  useEffect(() => {
    if (
      property.furnishingStatus ||
      property.occupancyType ||
      property.parking ||
      property.cctv ||
      property.ac ||
      property.cooler ||
      property.laundry ||
      property.geyser ||
      property.gym ||
      property.lift ||
      property.powerBackup
    ) {
      setPropertyFeature({
        furnishingStatus: property.furnishingStatus,
        occupancyType: property.occupancyType,
        parking: property.facilities.parking,
        cctv: property.facilities.cctv,
        ac: property.facilities.ac,
        cooler: property.facilities.cooler,
        laundry: property.facilities.laundry,
        geyser: property.facilities.geyser,
        gym: property.facilities.gym,
        lift: property.facilities.lift,
        powerBackup: property.facilities.powerBackup,
      });
    }
  }, [property]);
  return (
    <>
      <h4>Property Features</h4>
      <div className="propertyFeatures">
        <div className="furnished">
          <label htmlFor="">Furnishing Status:</label>
          <div className="fStatus">
            <div className="fFurnished">
              <input
                type="radio"
                id="ff"
                value="Full Furnished"
                name="furnishingStatus"
                checked={propertyFeature.furnishingStatus === "Full Furnished"}
                onChange={handleInputChange}
              />
              <label htmlFor="ff">Fully Furnished</label>
            </div>
            <div className="sFurnished">
              <input
                type="radio"
                id="sf"
                name="furnishingStatus"
                onChange={handleInputChange}
                value={"Semi-Furnished"}
                checked={propertyFeature.furnishingStatus === "Semi-Furnished"}
              />
              <label htmlFor="sf">Semi-Furnished</label>
            </div>
            <div className="uFurnished">
              <input
                type="radio"
                id="uf"
                value="Unfurnished"
                name="fuenishingStatus"
                onChange={handleInputChange}
                checked={propertyFeature.furnishingStatus === "Unfurnished"}
              />
              <label htmlFor="uf">Unfurnished</label>
            </div>
          </div>
          <span className="furnishingStatusError"></span>
        </div>
        <div className="occupancyType">
          <label htmlFor="">Occupancy Type:</label>
          <div className="oType">
            <div className="single">
              <input
                type="radio"
                value="Single"
                id="s"
                name="occupancyType"
                onChange={handleInputChange}
                checked={propertyFeature.occupancyType === "Single"}
              />
              <label htmlFor="s">Single</label>
            </div>
            <div className="double">
              <input
                type="radio"
                value="Double"
                id="d"
                name="occupancyType"
                onChange={handleInputChange}
                checked={propertyFeature.occupancyType === "Double"}
              />
              <label htmlFor="d">Double</label>
            </div>
            <div className="triple">
              <input
                type="radio"
                value="Triple"
                id="t"
                name="occupancyType"
                onChange={handleInputChange}
                checked={propertyFeature.occupancyType === "Triple"}
              />
              <label htmlFor="t">Triple</label>
            </div>
          </div>
          <span className="occupancyTypeError"></span>
        </div>
        <div className="facilitiesProvided">
          <label htmlFor="">Facilities Provided:</label>
          <div className="facilities">
            <div className="parking">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                value="Yes"
                onChange={handleInputChange}
                checked={propertyFeature.parking === "Yes"}
              />
              <label htmlFor="parking">Parking</label>
            </div>
            <div className="cctv">
              <input
                type="checkbox"
                name="cctv"
                id="cctv"
                value="Yes"
                onChange={handleInputChange}
                checked={propertyFeature.cctv === "Yes"}
              />
              <label htmlFor="cctv">CCTV</label>
            </div>
            <div className="laundry">
              <input
                type="checkbox"
                name="laundry"
                id="laundry"
                value="Yes"
                onChange={handleInputChange}
                checked={propertyFeature.laundry === "Yes"}
              />
              <label htmlFor="laundry">Laundry</label>
            </div>
            <div className="ac">
              <input
                type="checkbox"
                name="ac"
                id="ac"
                value="Yes"
                onChange={handleInputChange}
                checked={propertyFeature.ac === "Yes"}
              />
              <label htmlFor="ac">AC</label>
            </div>
            <div className="cooler">
              <input
                type="checkbox"
                name="cooler"
                id="cooler"
                value="Yes"
                onChange={handleInputChange}
                checked={propertyFeature.cooler === "Yes"}
              />
              <label htmlFor="cooler">Cooler</label>
            </div>
            <div className="geyser">
              <input
                type="checkbox"
                name="geyser"
                id="geyser"
                value="Yes"
                onChange={handleInputChange}
                checked={propertyFeature.geyser === "Yes"}
              />
              <label htmlFor="geyser">Geyser</label>
            </div>
            <div className="gym">
              <input
                type="checkbox"
                name="gym"
                id="gym"
                value="Yes"
                onChange={handleInputChange}
                checked={propertyFeature.gym === "Yes"}
              />
              <label htmlFor="gym">Gym</label>
            </div>
            <div className="lift">
              <input
                type="checkbox"
                name="lift"
                id="lift"
                value="Yes"
                onChange={handleInputChange}
                checked={propertyFeature.lift === "Yes"}
              />
              <label htmlFor="lift">Lift</label>
            </div>
            <div className="powerBackup">
              <input
                type="checkbox"
                name="powerBackup"
                id="powerBackup"
                value="Yes"
                onChange={handleInputChange}
                checked={propertyFeature.powerBackup === "Yes"}
              />
              <label htmlFor="powerBackup">Power Backup</label>
            </div>
          </div>
        </div>
      </div>
      <ShowBtns handlePropertyFeaturesSubmit={handlePropertyFeaturesSubmit} />
    </>
  );
}

export default PropertyFeatures;
