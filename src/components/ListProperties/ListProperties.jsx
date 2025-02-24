import React, { useEffect } from "react";
import "./ListProperties.css";

import Navbar from "../Navbar/Navbar";
import RenderSteps from "../ListProperties/RenderSteps";
import { setStep } from "../../faetures/PropertyForm/stepSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoMdDoneAll } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { resetPropertyFeatures } from "../../faetures/PropertyForm/PropertySlice";

const ListProperties = () => {
  const { id: userId } = useSelector((state) => state.user);
  const step = useSelector((state) => state.step);
  const property = useSelector((state) => state.property);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
    console.log(property);
  }, [userId, navigate, property]);

  const handleNavigation = (e) => {
    const allElement = e.target;
    const liArray = Array.from(allElement.parentElement.children);
    const liIndex = liArray.indexOf(allElement);

    if (e.target.innerText === "Property Details") {
      if (property.isPropertyDetails) {
        dispatch(setStep(liIndex + 1));
      }
    }
    if (e.target.innerText === "Location Details") {
      if (property.isLocationDetails) {
        dispatch(setStep(liIndex + 1));
      }
    }
    if (e.target.innerText === "Rent and Billing") {
      if (property.isRentDetails) {
        dispatch(setStep(liIndex + 1));
      }
    }
    if (e.target.innerText === "Property Features") {
      if (property.isPropertyFeatures) {
        dispatch(setStep(liIndex + 1));
      }
    }
    if (e.target.innerText === "Rules and Restrictions") {
      if (property.isRules) {
        dispatch(setStep(liIndex + 1));
      }
    }
    if (e.target.innerText === "Contact Information") {
      if (property.isContact) {
        dispatch(setStep(liIndex + 1));
      }
    }
    if (e.target.innerText === "Images and Media") {
      if (property.isMedias) {
        dispatch(setStep(liIndex + 1));
      }
    }
    if (e.target.innerText === "Preview") {
      if (
        property.isPropertyDetails &&
        property.isLocationDetails &&
        property.isRentDetails &&
        property.isPropertyFeatures &&
        property.isRules &&
        property.isContact &&
        property.isMedias
      ) {
        dispatch(setStep(8));
      }
    }
  };

  const urlToFile = async (url, filename, mimeType) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("listedBy", userId);
    formData.append("propertyType", property.propertyType);
    formData.append("title", property.title);
    formData.append("description", property.description);
    formData.append("city", property.city);
    formData.append("area", property.area);
    formData.append("landmark", property.landmark);
    formData.append("pincode", property.pincode);
    formData.append("rent", property.rent);
    formData.append("deposite", property.deposite);
    formData.append("electricityBill", property.electricityBill);
    formData.append("waterBill", property.waterBill);
    formData.append("internetBill", property.internetBill);
    formData.append("maintenance", property.maintenance);
    formData.append("furnishingStatus", property.furnishingStatus);
    formData.append("occupancyType", property.occupancyType);
    formData.append("parking", property.facilities.parking);
    formData.append("cctv", property.facilities.cctv);
    formData.append("laundry", property.facilities.laundry);
    formData.append("ac", property.facilities.ac);
    formData.append("cooler", property.facilities.cooler);
    formData.append("geyser", property.facilities.geyser);
    formData.append("gym", property.facilities.gym);
    formData.append("lift", property.facilities.lift);
    formData.append("powerBackup", property.facilities.powerBackup);
    formData.append("tenantPreference", property.tenantPreference);
    formData.append("genderPreference", property.genderPreference);
    formData.append("smokingAllowed", property.smokingAllowed);
    formData.append("alcoholAllowed", property.alcoholAllowed);
    formData.append("petsAllowed", property.petsAllowed);
    formData.append("ownerName", property.ownerName);
    formData.append("phoneNumber", property.phoneNumber);
    formData.append("email", property.email);

    // Handle images
    if (property.images && property.images.length >= 0) {
      for (let i = 0; i < property.images.length; i++) {
        const file = await urlToFile(
          property.images[i],
          `image-${i + 1}.jpg`,
          "image/jpeg"
        );
        formData.append("images", file);
      }
    }

    // Handle video
    if (property.video) {
      const videoFile = await urlToFile(
        property.video,
        "video.mp4",
        "video/mp4"
      );
      formData.append("video", videoFile);
    }

    // Debugging: Log FormData contents
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const response = await fetch(
        "https://stay-backend.onrender.com/list-your-properties",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Property submitted successfully:", data);
      dispatch(resetPropertyFeatures());
      dispatch(setStep(1)); // Reset to step 1 after submission
    } catch (error) {
      console.error("Error submitting property:", error.message);
      alert("Failed to submit the property. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="propertiesForm">
        <div className="formController formControllerPin">
          <h1>Turn Your Space Into Income – Start Listing Now!</h1>
          <ul className="all-list-items">
            <li
              className={step === 1 ? "active-step" : ""}
              onClick={handleNavigation}
            >
              Property Details
              {property.isPropertyDetails ? (
                <IoMdDoneAll
                  className="done"
                  style={{
                    color:
                      step === 1 && property.isPropertyDetails
                        ? "white"
                        : "green",
                  }}
                />
              ) : (
                ""
              )}
            </li>
            <li
              className={step === 2 ? "active-step" : ""}
              onClick={handleNavigation}
            >
              Location Details
              {property.isLocationDetails ? (
                <IoMdDoneAll
                  className="done"
                  style={{
                    color:
                      step === 2 && property.isLocationDetails
                        ? "white"
                        : "green",
                  }}
                />
              ) : (
                ""
              )}
            </li>
            <li
              className={step === 3 ? "active-step" : ""}
              onClick={handleNavigation}
            >
              Rent and Billing
              {property.isRentDetails ? (
                <IoMdDoneAll
                  className="done"
                  style={{
                    color:
                      step === 3 && property.isRentDetails ? "white" : "green",
                  }}
                />
              ) : (
                ""
              )}
            </li>
            <li
              className={step === 4 ? "active-step" : ""}
              onClick={handleNavigation}
            >
              Property Features
              {property.isPropertyFeatures ? (
                <IoMdDoneAll
                  className="done"
                  style={{
                    color:
                      step === 4 && property.isPropertyFeatures
                        ? "white"
                        : "green",
                  }}
                />
              ) : (
                ""
              )}
            </li>
            <li
              className={step === 5 ? "active-step" : ""}
              onClick={handleNavigation}
            >
              Rules and Restrictions
              {property.isRules ? (
                <IoMdDoneAll
                  className="done"
                  style={{
                    color: step === 5 && property.isRules ? "white" : "green",
                  }}
                />
              ) : (
                ""
              )}
            </li>
            <li
              className={step === 6 ? "active-step" : ""}
              onClick={handleNavigation}
            >
              Contact Information
              {property.isContact ? (
                <IoMdDoneAll
                  className="done"
                  style={{
                    color: step === 6 && property.isContact ? "white" : "green",
                  }}
                />
              ) : (
                ""
              )}
            </li>
            <li
              className={step === 7 ? "active-step" : ""}
              onClick={handleNavigation}
            >
              Images and Media
              {property.isMedias ? (
                <IoMdDoneAll
                  className="done"
                  style={{
                    color: step === 7 && property.isMedias ? "white" : "green",
                  }}
                />
              ) : (
                ""
              )}
            </li>
            <li
              className={step === 8 ? "active-step" : ""}
              onClick={handleNavigation}
            >
              Preview
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <RenderSteps />
        </form>
      </div>
    </>
  );
};

export default ListProperties;
