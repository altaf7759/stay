import React, { useEffect, useState } from "react";

import ShowBtns from "./ShowBtns";
import { setContactInfo } from "../../faetures/PropertyForm/PropertySlice";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../faetures/PropertyForm/stepSlice";

function ContactInfo() {
  const step = useSelector((state) => state.step);
  const property = useSelector((state) => state.property);
  const dispatch = useDispatch();
  const [contactInfos, setContactInfos] = useState({
    ownerName: "",
    phoneNumber: "",
    email: "",
  });

  useEffect(() => {
    if (property.ownerName || property.phoneNumber || property.email) {
      setContactInfos({
        ownerName: property.ownerName,
        phoneNumber: property.phoneNumber,
        email: property.email,
      });
    }
  }, [property]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setContactInfos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateContactInfo = () => {
    const { ownerName, phoneNumber } = contactInfos;
    const ownerError = document.querySelector(".ownerError");
    const phoneError = document.querySelector(".phoneError");
    let isValid = true;

    if (!ownerName) {
      ownerError.innerHTML = "Please enter your name";
      isValid = false;
    } else {
      ownerError.innerHTML = "";
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      phoneError.innerHTML = !phoneNumber
        ? "Please enter your phone number"
        : "Phone Number must contain at least 10 digits";
      isValid = false;
    } else {
      phoneError.innerHTML = "";
    }

    return isValid;
  };

  const handleContactInfo = () => {
    if (validateContactInfo()) {
      dispatch(
        setContactInfo({
          ownerName: contactInfos.ownerName,
          phoneNumber: contactInfos.phoneNumber,
          email: contactInfos.email,
          isContact: true,
        })
      );
    } else {
      dispatch(setStep(step - 1));
    }
  };

  return (
    <>
      <h4>Contact Information</h4>
      <div className="contactInfo">
        <div className="owner">
          <label htmlFor="owner">Owner Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="ownerName"
            value={contactInfos.ownerName}
            onChange={handleInputChange}
          />
          <span className="ownerError"></span>
        </div>
        <div className="phone">
          <label htmlFor="owner">Phone Number:</label>
          <input
            type="number"
            placeholder="Enter your phone number"
            name="phoneNumber"
            value={contactInfos.phoneNumber}
            onChange={handleInputChange}
          />
          <span className="phoneError"></span>
        </div>
        <div className="email">
          <label htmlFor="owner">Email Id (Optional):</label>
          <input
            type="email"
            placeholder="Enter your email id"
            name="email"
            value={contactInfos.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <ShowBtns handleContactInfo={handleContactInfo} />
    </>
  );
}

export default ContactInfo;
