import React, { useEffect, useRef, useState } from "react";
import "./Filter.css";

import { IoHome } from "react-icons/io5";
import { PiGenderFemaleBold } from "react-icons/pi";
import { RiWaterFlashFill } from "react-icons/ri";
import { LuIndianRupee } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { data, useNavigate } from "react-router-dom";

const Filter = ({ propertyData, setFilteredPropertyData, setPropertyData }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef();
  const [filters, setFilters] = useState({
    propertyType: "",
    genderType: "",
    priceRange: "",
    internetBill: false,
    electricityBill: false,
    waterBill: false,
    cctv: "No",
    gym: "No",
    lift: "No",
    powerBackup: "No",
    parking: "No",
    laundry: "No",
    ac: "No",
    geyser: "No",
    cooler: "No",
  });

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.locationiq.com/v1/autocomplete.php?key=pk.a591f2c6fb9a072f59022fb97b2f5ccb&q=${query.trim()}&tag=place:city,place:town,place:village&limit=5&countrycodes=IN`
        );

        if (!response.ok) throw new Error("Failed to fetch suggestions.");

        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300); // 300ms debounce
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      alert("Please select a valid city name from the suggestions.");
      return;
    }

    fetch(
      `pleasant-comfort-stay-backend.up.railway.app/search?query=${searchQuery}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFilteredPropertyData(data);
      });
  };

  const handlePropertyTypeChange = (e) => {
    setFilters({
      ...filters,
      propertyType: e.target.value,
    });
  };

  const handleGenderTypeChange = (e) => {
    setFilters({
      ...filters,
      genderType: e.target.value,
    });
  };

  const handlePriceRangeClick = (range) => {
    setFilters({
      ...filters,
      priceRange: range,
    });
  };

  const handleBillsChange = (e) => {
    const { name, checked } = e.target;

    setFilters({
      ...filters,
      [name]: checked,
    });
  };

  const handleFeaturesChange = (e) => {
    const { name, checked } = e.target;

    setFilters({
      ...filters,
      [name]: checked ? "Yes" : "No",
    });
  };

  useEffect(() => {
    let originalPropertyData = propertyData;

    if (filters.propertyType) {
      originalPropertyData = originalPropertyData.filter(
        (property) => property.propertyType === filters.propertyType
      );
    }

    if (filters.genderType) {
      originalPropertyData = originalPropertyData.filter(
        (property) => property.genderPreference === filters.genderType
      );
    }

    if (filters.priceRange) {
      if (filters.priceRange === "Under 5000") {
        originalPropertyData = originalPropertyData.filter(
          (property) => property.rent < 5001
        );
      }
      if (filters.priceRange === "Under 10000") {
        originalPropertyData = originalPropertyData.filter(
          (property) => property.rent < 10001
        );
      }
      if (filters.priceRange === "Under 15000") {
        originalPropertyData = originalPropertyData.filter(
          (property) => property.rent < 15001
        );
      }
      if (filters.priceRange === "Under 20000") {
        originalPropertyData = originalPropertyData.filter(
          (property) => property.rent < 20001
        );
      }
      if (filters.priceRange === "More than 20000") {
        originalPropertyData = originalPropertyData.filter(
          (property) => property.rent > 19999
        );
      }
    }

    if (filters.internetBill) {
      originalPropertyData = originalPropertyData.filter(
        (property) => property.internetBill === filters.internetBill
      );
    }

    if (filters.electricityBill) {
      originalPropertyData = originalPropertyData.filter(
        (property) => property.electricityBill === filters.electricityBill
      );
    }

    if (filters.waterBill) {
      originalPropertyData = originalPropertyData.filter(
        (property) => property.waterBill === filters.waterBill
      );
    }

    if (filters.cctv === "Yes") {
      originalPropertyData = originalPropertyData.filter(
        (property) => property.facilities.cctv === filters.cctv
      );
    }

    if (filters.ac === "Yes") {
      originalPropertyData = originalPropertyData.filter(
        (property) => property.facilities.ac === filters.ac
      );
    }

    if (filters.cooler === "Yes") {
      originalPropertyData = originalPropertyData.filter(
        (property) => property.facilities.cooler === filters.cooler
      );
    }

    if (filters.geyser === "Yes") {
      originalPropertyData = originalPropertyData.filter(
        (property) => property.facilities.geyser === filters.geyser
      );
    }

    if (filters.powerBackup === "Yes") {
      originalPropertyData = originalPropertyData.filter(
        (property) => property.facilities.powerBackup === filters.powerBackup
      );
    }

    if (filters.gym === "Yes") {
      originalPropertyData = originalPropertyData.filter(
        (property) => property.facilities.gym === filters.gym
      );
    }

    if (filters.lift === "Yes") {
      originalPropertyData = originalPropertyData.filter(
        (property) => property.facilities.lift === filters.lift
      );
    }

    if (filters.laundry === "Yes") {
      originalPropertyData = originalPropertyData.filter(
        (property) => property.facilities.laundry === filters.laundry
      );
    }

    if (filters.parking === "Yes") {
      originalPropertyData = originalPropertyData.filter(
        (property) => property.facilities.parking === filters.parking
      );
    }

    setFilteredPropertyData(originalPropertyData);
  }, [filters, propertyData, setFilteredPropertyData]);

  const handleClear = () => {
    setFilters({
      propertyType: "",
      genderType: "",
      priceRange: "",
      internetBill: false,
      electricityBill: false,
      waterBill: false,
      cctv: "No",
      gym: "No",
      lift: "No",
      powerBackup: "No",
      parking: "No",
      laundry: "No",
      ac: "No",
      geyser: "No",
      cooler: "No",
    });
    setQuery("");
  };

  return (
    <div className="filters-box">
      <p className="heading">Fitler Your Requirement</p>
      <div className="search-box-filter">
        <input
          type="text"
          placeholder="Search here..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(e);
            }
          }}
        />
        <FaSearch className="search-icon-filter" onClick={handleSearch} />
        <div className="suggestions-section">
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: "0 10px",
              position: "absolute",
              width: "100%",
              background: "#fff",
              borderRadius: "5px",
              height: "fit-content",
              textShadow: "none",
              boxShadow: "0px 0px 2px lightgray",
              zIndex: 1000,
            }}
          >
            {isFocused &&
              suggestions.map((item, key) => (
                <li
                  key={key}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid lightgray",
                    color: "black",
                  }}
                  onMouseDown={() => {
                    setQuery(item.display_name);
                    setSearchQuery(
                      item.address.name ||
                        item.address.city ||
                        item.address.town
                    );
                    setSuggestions([]);
                    setTimeout(() => inputRef.current.focus(), 0);
                  }}
                >
                  {item.display_name}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="type">
        <div className="label">
          <IoHome />
          <label htmlFor="">Property Type</label>
        </div>
        <div className="select-type-input">
          <select
            name=""
            id=""
            onChange={handlePropertyTypeChange}
            value={filters.propertyType}
          >
            <option value="">Select Property Type</option>
            <option value="Flat/Room">Flat/Room</option>
            <option value="Hostel/PG">Hostel/PG</option>
            <option value="Girls Hostel/PG">Girls Hostel/PG</option>
          </select>
          <IoHome className="home-icon" />
        </div>
      </div>
      <div className="gender">
        <div className="label">
          <PiGenderFemaleBold />
          <label htmlFor="">Gender</label>
        </div>
        <div className="select-gender-input">
          <select
            name=""
            id=""
            onChange={handleGenderTypeChange}
            value={filters.genderType}
          >
            <option value="">Select Gender Type</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Any">Any</option>
          </select>
          <PiGenderFemaleBold className="gender-icon" />
        </div>
        <div className="price-range">
          <div className="label">
            <LuIndianRupee />
            <label htmlFor="">Price Range</label>
          </div>
          <ul className="price-btns">
            {[
              "Under 5000",
              "Under 10000",
              "Under 15000",
              "Under 20000",
              "More than 20000",
            ].map((range) => (
              <li
                key={range}
                onClick={() => handlePriceRangeClick(range)}
                style={{
                  backgroundColor:
                    filters.priceRange === range
                      ? "lightgray"
                      : "rgb(246, 246, 246)",
                }}
              >
                {range}
              </li>
            ))}
          </ul>
        </div>
        <div className="bills">
          <div className="bills-heading">
            <RiWaterFlashFill />
            <p>Bills Included</p>
          </div>
          <div className="bill-select">
            <div className="internet">
              <input
                type="checkbox"
                onChange={handleBillsChange}
                checked={filters.internetBill}
                name="internetBill"
                id="net"
              />
              <label htmlFor="net">Internet Bill</label>
            </div>
            <div className="electricity">
              <input
                type="checkbox"
                onChange={handleBillsChange}
                id="electtricity"
                checked={filters.electricityBill}
                name="electricityBill"
              />
              <label htmlFor="electtricity">Electricity Bill</label>
            </div>
            <div className="water">
              <input
                type="checkbox"
                onChange={handleBillsChange}
                id="w-bill"
                checked={filters.waterBill}
                name="waterBill"
              />
              <label htmlFor="w-bill">Water Bill</label>
            </div>
          </div>
        </div>
        <div className="features">
          <div className="features-heading">
            <IoHome />
            <p>Property Features</p>
          </div>
          <div className="select-features">
            <div className="cctv-section">
              <div className="one">
                <input
                  type="checkbox"
                  id="cctv"
                  name="cctv"
                  onChange={handleFeaturesChange}
                  checked={filters.cctv == "Yes"}
                />
                <label htmlFor="cctv">CCTV</label>
              </div>
            </div>
            <div className="gym-section">
              <div className="two">
                <input
                  type="checkbox"
                  id="gym"
                  name="gym"
                  onChange={handleFeaturesChange}
                  checked={filters.gym == "Yes"}
                />
                <label htmlFor="gym">Gym</label>
              </div>
            </div>
            <div className="lift-section">
              <div className="three">
                <input
                  type="checkbox"
                  id="lift"
                  name="lift"
                  onChange={handleFeaturesChange}
                  checked={filters.lift == "Yes"}
                />
                <label htmlFor="lift">Lift</label>
              </div>
            </div>
            <div className="power-section">
              <div className="four">
                <input
                  type="checkbox"
                  id="power"
                  name="powerBackup"
                  onChange={handleFeaturesChange}
                  checked={filters.powerBackup == "Yes"}
                />
                <label htmlFor="power">Power Backup</label>
              </div>
            </div>
            <div className="parking-section">
              <div className="five">
                <input
                  type="checkbox"
                  id="parking"
                  name="parking"
                  onChange={handleFeaturesChange}
                  checked={filters.parking == "Yes"}
                />
                <label htmlFor="parking">Parking</label>
              </div>
            </div>
            <div className="cooler-section">
              <div className="six">
                <input
                  type="checkbox"
                  id="cooler"
                  name="cooler"
                  onChange={handleFeaturesChange}
                  checked={filters.cooler == "Yes"}
                />
                <label htmlFor="cooler">Cooler</label>
              </div>
            </div>
            <div className="ac-section">
              <div className="seven">
                <input
                  type="checkbox"
                  id="ac"
                  name="ac"
                  onChange={handleFeaturesChange}
                  checked={filters.ac == "Yes"}
                />
                <label htmlFor="ac">AC</label>
              </div>
            </div>
            <div className="geyser-section">
              <div className="eight">
                <input
                  type="checkbox"
                  id="geyser"
                  name="geyser"
                  onChange={handleFeaturesChange}
                  checked={filters.geyser == "Yes"}
                />
                <label htmlFor="geyser">Geyser</label>
              </div>
            </div>
            <div className="laundry-section">
              <div className="nine">
                <input
                  type="checkbox"
                  id="laundry"
                  name="laundry"
                  onChange={handleFeaturesChange}
                  checked={filters.laundry == "Yes"}
                />
                <label htmlFor="laundry">Laundry</label>
              </div>
            </div>
          </div>
        </div>
        <button className="applyBtn" onClick={handleClear}>
          Clear Filter
        </button>{" "}
        <br /> <br />
      </div>
    </div>
  );
};

export default Filter;
