import React, { useEffect, useRef, useState } from "react";

import ShowBtns from "./showBtns";
import { useSelector, useDispatch } from "react-redux";
import { setRentAndBilling } from "../../faetures/PropertyForm/PropertySlice";
import { setStep } from "../../faetures/PropertyForm/stepSlice";

function rentAndBilling() {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.step);
  const property = useSelector((state) => state.property);
  const [rentAndBillings, setRentAndBillings] = useState({
    rent: "",
    deposite: "",
    electricityBill: false,
    waterBill: false,
    internetBill: false,
    maintenance: "",
  });

  useEffect(() => {
    if (
      property.rent ||
      property.deposite ||
      property.electricityBill ||
      property.waterBill ||
      property.internetBill ||
      property.maintenance
    ) {
      setRentAndBillings({
        rent: property.rent,
        deposite: property.deposite,
        electricityBill: property.electricityBill,
        waterBill: property.waterBill,
        internetBill: property.internetBill,
        maintenance: property.maintenance,
      });
    }
  }, [property]);

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setRentAndBillings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateRentAndBillig = () => {
    const { rent, deposite, maintenance } = rentAndBillings;
    const rentError = document.querySelector(".rentError");
    const depositeError = document.querySelector(".depositeError");
    const maintenanceError = document.querySelector(".maintenanceError");
    let isValid = true;

    if (!rent || rent < 0) {
      rentError.innerHTML = !rent
        ? "Please enter rent amount"
        : "Rent amount can not ne less than 0";
      isValid = false;
    } else {
      rentError.innerHTML = "";
    }

    if (deposite < 0) {
      depositeError.innerHTML = "Deposite amount can not be less than 0";
      isValid = false;
    } else {
      depositeError.innerHTML = "";
    }

    if (maintenance < 0) {
      maintenanceError.innerHTML = "Maintenance amount can not be less than 0";
      isValid = false;
    } else {
      maintenanceError.innerHTML = "";
    }

    return isValid;
  };

  const handleRentAndBilling = () => {
    if (validateRentAndBillig()) {
      dispatch(
        setRentAndBilling({
          rent: rentAndBillings.rent,
          deposite: rentAndBillings.deposite,
          electricityBill: rentAndBillings.electricityBill,
          waterBill: rentAndBillings.waterBill,
          internetBill: rentAndBillings.internetBill,
          maintenance: rentAndBillings.maintenance,
          isRentDetails: true,
        })
      );
    } else {
      dispatch(setStep(step - 1));
    }
  };

  return (
    <>
      <h4>Rent and Billing</h4>
      <div className="rentAndBilling">
        <div className="rent">
          <label htmlFor="rent">Rent:</label>
          <input
            type="number"
            placeholder="Monthly rent"
            onChange={handleInputChange}
            value={rentAndBillings.rent}
            name="rent"
            id="rent"
          />
          <span className="rentError"></span>
        </div>
        <div className="deposite">
          <label htmlFor="deposite">Deposite Amount(Optional):</label>
          <input
            type="number"
            id="deposite"
            onChange={handleInputChange}
            value={rentAndBillings.deposite}
            name="deposite"
            placeholder="sequrity deposite"
          />
          <span className="depositeError"></span>
        </div>
        <div className="addBillInc">
          <label htmlFor="">Additional Bill Included:</label>
          <div className="addBillsInc">
            <div className="ebill">
              <input
                type="checkbox"
                id="ebill"
                onChange={handleInputChange}
                checked={rentAndBillings.electricityBill}
                name="electricityBill"
              />
              <label htmlFor="ebill">Electricity Bill</label>
            </div>
            <div className="wbill">
              <input
                type="checkbox"
                id="wbill"
                onChange={handleInputChange}
                checked={rentAndBillings.waterBill}
                name="waterBill"
              />
              <label htmlFor="wbill">Water Bill</label>
            </div>
            <div className="ibill">
              <input
                type="checkbox"
                id="ibill"
                onChange={handleInputChange}
                checked={rentAndBillings.internetBill}
                name="internetBill"
              />
              <label htmlFor="ibill">Internet Bill</label>
            </div>
          </div>
        </div>
        <div className="maintenance">
          <label htmlFor="maintenance">Maintanance Charges (Optional):</label>
          <input
            type="number"
            onChange={handleInputChange}
            value={rentAndBillings.maintenance}
            name="maintenance"
            placeholder="Maintenance charges if applicable"
          />
          <span className="maintenanceError"></span>
        </div>
      </div>
      <ShowBtns handleRentAndBilling={handleRentAndBilling} />
    </>
  );
}

export default rentAndBilling;
