import React, { useEffect, useState } from "react";

import ShowBtns from "./ShowBtns";
import { setRulesAndRestrictions } from "../../faetures/PropertyForm/PropertySlice";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../faetures/PropertyForm/stepSlice";

function RulesAndRestrictions() {
  const property = useSelector((state) => state.property);
  const step = useSelector((state) => state.step);
  const dispatch = useDispatch();
  const [rulesAndRestriction, setRulesAndRestriction] = useState({
    tenantPreference: "",
    genderPreference: "",
    smokingAllowed: "",
    alcoholAllowed: "",
    petsAllowed: "",
  });

  useEffect(() => {
    if (
      property.tenantPreference ||
      property.genderPreference ||
      property.smokingAllowed ||
      property.alcoholAllowed ||
      property.petsAllowed
    ) {
      setRulesAndRestriction({
        tenantPreference: property.tenantPreference,
        genderPreference: property.genderPreference,
        smokingAllowed: property.smokingAllowed,
        alcoholAllowed: property.alcoholAllowed,
        petsAllowed: property.petsAllowed,
      });
    }
  }, [property]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setRulesAndRestriction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateRulesAndRes = () => {
    const {
      tenantPreference,
      genderPreference,
      smokingAllowed,
      alcoholAllowed,
      petsAllowed,
    } = rulesAndRestriction;
    const tenantsError = document.querySelector(".tenantsError");
    const genderError = document.querySelector(".genderError");
    const smokingError = document.querySelector(".smokingError");
    const alcoholError = document.querySelector(".alcoholError");
    const petsError = document.querySelector(".petsError");
    let isValid = true;

    if (!tenantPreference) {
      tenantsError.innerHTML = "Please select tenants preference";
      isValid = false;
    } else {
      tenantsError.innerHTML = "";
    }

    if (!genderPreference) {
      genderError.innerHTML = "Please select gender preference";
      isValid = false;
    } else {
      genderError.innerHTML = "";
    }

    if (!smokingAllowed) {
      smokingError.innerHTML = "Please select smoking allowed or not";
      isValid = false;
    } else {
      smokingError.innerHTML = "";
    }

    if (!alcoholAllowed) {
      alcoholError.innerHTML = "Please select alcohol allowed or not";
      isValid = false;
    } else {
      alcoholError.innerHTML = "";
    }

    if (!petsAllowed) {
      petsError.innerHTML = "Please select pets allowed or not";
      isValid = false;
    } else {
      petsError.innerHTML = "";
    }

    return isValid;
  };

  const handleRulesAndResSubmit = () => {
    if (validateRulesAndRes()) {
      dispatch(
        setRulesAndRestrictions({
          tenantPreference: rulesAndRestriction.tenantPreference,
          genderPreference: rulesAndRestriction.genderPreference,
          smokingAllowed: rulesAndRestriction.alcoholAllowed,
          alcoholAllowed: rulesAndRestriction.alcoholAllowed,
          petsAllowed: rulesAndRestriction.petsAllowed,
          isRules: true,
        })
      );
    } else {
      dispatch(setStep(step - 1));
    }
  };

  return (
    <>
      <h4>Rules and Restrictions:</h4>
      <div className="rulesAndRes">
        <div className="rulesAndRestrictions">
          <div className="rules">
            <div className="tenants">
              <label htmlFor="">Preferred Tenants:</label>
              <div className="tOptions">
                <div className="family">
                  <input
                    type="radio"
                    name="tenantPreference"
                    id="f"
                    value="Family"
                    onChange={handleInputChange}
                    checked={rulesAndRestriction.tenantPreference == "Family"}
                  />
                  <label htmlFor="f">Family</label>
                </div>
                <div className="student">
                  <input
                    type="radio"
                    name="tenantPreference"
                    id="s"
                    value="Students"
                    onChange={handleInputChange}
                    checked={rulesAndRestriction.tenantPreference == "Students"}
                  />
                  <label htmlFor="s">Students</label>
                </div>
                <div className="working">
                  <input
                    type="radio"
                    name="tenantPreference"
                    id="w"
                    value="Working Professionals"
                    onChange={handleInputChange}
                    checked={
                      rulesAndRestriction.tenantPreference ==
                      "Working Professionals"
                    }
                  />
                  <label htmlFor="w">Working Professionals</label>
                </div>
                <div className="bachelors">
                  <input
                    type="radio"
                    name="tenantPreference"
                    id="b"
                    value="Bachelors"
                    onChange={handleInputChange}
                    checked={
                      rulesAndRestriction.tenantPreference == "Bachelors"
                    }
                  />
                  <label htmlFor="b">Bachelors</label>
                </div>
              </div>
              <span className="tenantsError"></span>
            </div>
          </div>
        </div>
        <div className="genderPref">
          <label htmlFor="">Gender Preference:</label>
          <div className="gOptions">
            <div className="male">
              <input
                type="radio"
                name="genderPreference"
                id="m"
                value="Male"
                onChange={handleInputChange}
                checked={rulesAndRestriction.genderPreference == "Male"}
              />
              <label htmlFor="m">Male</label>
            </div>
            <div className="female">
              <input
                type="radio"
                name="genderPreference"
                id="fm"
                value="Female"
                onChange={handleInputChange}
                checked={rulesAndRestriction.genderPreference == "Female"}
              />
              <label htmlFor="fm">Female</label>
            </div>
            <div className="any">
              <input
                type="radio"
                name="genderPreference"
                id="a"
                value="Any"
                onChange={handleInputChange}
                checked={rulesAndRestriction.genderPreference == "Any"}
              />
              <label htmlFor="a">Any</label>
            </div>
          </div>
          <span className="genderError"></span>
        </div>
        <div className="smokingAllowed">
          <label htmlFor="">Smoking Allowed:</label>
          <div className="smoking">
            <div className="yes">
              <input
                type="radio"
                name="smokingAllowed"
                id="syes"
                value="Yes"
                onChange={handleInputChange}
                checked={rulesAndRestriction.smokingAllowed == "Yes"}
              />
              <label htmlFor="syes">Yes</label>
            </div>
            <div className="no">
              <input
                type="radio"
                name="smokingAllowed"
                id="sno"
                value="No"
                onChange={handleInputChange}
                checked={rulesAndRestriction.smokingAllowed == "No"}
              />
              <label htmlFor="sno">No</label>
            </div>
          </div>
          <span className="smokingError"></span>
        </div>
        <div className="petsAllowed">
          <label htmlFor="">Pets Allowed:</label>
          <div className="pets">
            <div className="yes">
              <input
                type="radio"
                name="petsAllowed"
                id="pyes"
                value="Yes"
                onChange={handleInputChange}
                checked={rulesAndRestriction.petsAllowed == "Yes"}
              />
              <label htmlFor="pyes">Yes</label>
            </div>
            <div className="no">
              <input
                type="radio"
                name="petsAllowed"
                id="pno"
                value="No"
                onChange={handleInputChange}
                checked={rulesAndRestriction.petsAllowed == "No"}
              />
              <label htmlFor="pno">No</label>
            </div>
          </div>
          <span className="petsError"></span>
        </div>
        <div className="alcoholAllowed">
          <label htmlFor="">Alcohol Allowed:</label>
          <div className="alcohol">
            <div className="yes">
              <input
                type="radio"
                name="alcoholAllowed"
                id="ayes"
                value="Yes"
                onChange={handleInputChange}
                checked={rulesAndRestriction.alcoholAllowed == "Yes"}
              />
              <label htmlFor="ayes">Yes</label>
            </div>
            <div className="no">
              <input
                type="radio"
                name="alcoholAllowed"
                id="ano"
                value="No"
                onChange={handleInputChange}
                checked={rulesAndRestriction.alcoholAllowed == "No"}
              />
              <label htmlFor="ano">No</label>
            </div>
          </div>
          <span className="alcoholError"></span>
        </div>
      </div>
      <ShowBtns handleRulesAndResSubmit={handleRulesAndResSubmit} />
    </>
  );
}

export default RulesAndRestrictions;
