import React, { useEffect, useState } from "react";

import ShowBtns from "./showBtns";
import { useDispatch, useSelector } from "react-redux";
import { setLocationDetails } from "../../faetures/PropertyForm/PropertySlice";
import { setStep } from "../../faetures/PropertyForm/stepSlice";

function locationDetails() {
  const property = useSelector((state) => state.property);
  const dispatch = useDispatch();
  const step = useSelector((state) => state.step);
  const [locationDetail, setLocationDetail] = useState({
    city: "",
    area: "",
    landmark: "",
    pincode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLocationDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setLocationDetail({
      city: property.city || "",
      area: property.area || "",
      landmark: property.landmark || "",
      pincode: property.pincode || "",
    });
  }, [property]);

  const validateLocation = () => {
    const { city, area, pincode } = locationDetail;

    let isValid = true;

    const cityError = document.querySelector(".cityError");
    const areaError = document.querySelector(".areaError");
    const pincodeError = document.querySelector(".pincodeError");

    if (!city) {
      cityError.innerHTML = "Please enter city name";
      isValid = false;
    } else {
      cityError.innerHTML = "";
    }

    if (!area) {
      areaError.innerHTML = "Please enter area name";
      isValid = false;
    } else {
      areaError.innerHTML = "";
    }

    if (!pincode || pincode.length < 6) {
      pincodeError.innerHTML = !pincode
        ? "Please enter pincode"
        : "Pincode should atleast 6 digits";
      isValid = false;
    } else {
      pincodeError.innerHTML = "";
    }

    return isValid;
  };

  const handleLocationDetails = () => {
    if (validateLocation()) {
      dispatch(
        setLocationDetails({
          city: locationDetail.city,
          area: locationDetail.area,
          landmark: locationDetail.landmark,
          pincode: locationDetail.pincode,
          isLocationDetails: true,
        })
      );
    } else {
      dispatch(setStep(step - 1));
    }
  };

  return (
    <>
      <h4>Location Details:</h4>
      <div className="locationDetails">
        <div className="city">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            placeholder="Enter your city"
            id="city"
            value={locationDetail.city}
            onChange={handleInputChange}
          />
          <span className="cityError"></span>
        </div>
        <div className="area">
          <label htmlFor="area">Area/Locality:</label>
          <input
            type="text"
            name="area"
            value={locationDetail.area}
            onChange={handleInputChange}
            placeholder="Enter your area"
          />
          <span className="areaError"></span>
        </div>
        <div className="landmark">
          <label htmlFor="landmark">Landmark (Optional):</label>
          <input
            type="text"
            name="landmark"
            placeholder="Enter a landmark"
            id="landmark"
            value={locationDetail.landmark}
            onChange={handleInputChange}
          />
        </div>
        <div className="pin">
          <label htmlFor="pin">Pincode/Postel Code:</label>
          <input
            type="number"
            name="pincode"
            placeholder="Enter your pincode"
            id="pin"
            value={locationDetail.pincode}
            onChange={handleInputChange}
          />
          <span className="pincodeError"></span>
        </div>
      </div>
      <ShowBtns handleLocation={handleLocationDetails} />
    </>
  );
}

export default locationDetails;
