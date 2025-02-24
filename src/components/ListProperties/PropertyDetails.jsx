import React, { useRef, useState, useEffect } from "react";
import ShowBtns from "./showBtns";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyDetails } from "../../faetures/PropertyForm/PropertySlice";
import { setStep } from "../../faetures/PropertyForm/stepSlice";

function PropertyDetails() {
  const titleInputRef = useRef(null);
  const step = useSelector((state) => state.step);
  const property = useSelector((state) => state.property);
  const dispatch = useDispatch();

  const [propertyDetail, setPropertyDetail] = useState({
    propertyType: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (property.propertyType || property.title || property.description) {
      setPropertyDetail({
        propertyType: property.propertyType || "",
        title: property.title || "",
        description: property.description || "",
      });
    }
  }, [property]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePropertyDetails = () => {
    const { propertyType, title, description } = propertyDetail;

    let isValid = true;

    const selectError = document.querySelector(".selectError");
    const titleError = document.querySelector(".titleError");
    const descriptionError = document.querySelector(".descriptionError");

    if (!propertyType) {
      selectError.innerHTML = "Please select a property type";
      isValid = false;
    } else {
      selectError.innerHTML = "";
    }

    if (!title || title.length < 20) {
      titleError.innerHTML = !title
        ? "Please enter a title"
        : "Title must be at least 20 characters";
      isValid = false;
    } else if (title.length > 250) {
      titleError.innerHTML = "Title must be less than 250 characters";
      isValid = false;
    } else {
      titleError.innerHTML = "";
    }

    if (!description || description.length < 250) {
      descriptionError.innerHTML = !description
        ? "Please enter a description"
        : "Description must be at least 250 characters";
      isValid = false;
    } else if (description.length > 1500) {
      descriptionError.innerHTML =
        "Description must be less than 1500 characters";
      isValid = false;
    } else {
      descriptionError.innerHTML = "";
    }

    return isValid;
  };

  const handlePropetryDetailsSubmit = () => {
    if (validatePropertyDetails()) {
      dispatch(
        setPropertyDetails({
          propertyType: propertyDetail.propertyType,
          title: propertyDetail.title,
          description: propertyDetail.description,
          isPropertyDetails: true,
        })
      );
    } else {
      dispatch(setStep(step - 1));
    }
  };

  return (
    <>
      <h4>Property Details:</h4>
      <div className="propertyDetailInputs">
        <div className="typeTitle">
          <div className="type">
            <label htmlFor="type">Property Type:</label>
            <select
              name="propertyType"
              value={propertyDetail.propertyType}
              id="type"
              onChange={handleInputChange}
            >
              <option value="">Select Property Type</option>
              <option value="Flat/Room">Flat/Room</option>
              <option value="Hostel/PG">Hostel/PG</option>
              <option value="Girls Hostel/PG">Girls Hostel/PG</option>
            </select>
            <span className="selectError"></span>
          </div>
          <div className="title">
            <label htmlFor="title">Title:</label>
            <input
              onChange={handleInputChange}
              value={propertyDetail.title}
              type="text"
              name="title"
              id="title"
              ref={titleInputRef}
              placeholder="Title for your property"
            />
            <span className="titleError"></span>
          </div>
        </div>
        <div className="description">
          <label htmlFor="description">Description:</label>
          <textarea
            onChange={handleInputChange}
            value={propertyDetail.description}
            name="description"
            id="description"
            rows={10}
            placeholder="Write something about your property"
          ></textarea>
          <span className="descriptionError"></span>
        </div>
      </div>
      <ShowBtns propertyDetails={handlePropetryDetailsSubmit} />
    </>
  );
}

export default PropertyDetails;
