import React, { useEffect, useState, useRef } from "react";
import "./Properties.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Filter from "../../components/Filter/Filter";
import PropertiesItem from "../../components/PropertiesItem/PropertiesItem";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Properties = ({ title }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState("Sort By");
  const [propertyData, setPropertyData] = useState([]);
  const [filteredPropertyData, setFilteredPropertyData] = useState([]);
  const sortRef = useRef();
  const buttonRef = useRef();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sortStyle = {
    display: isSortOpen ? "block" : "none",
    transition: "display 0.3s ease-in-out",
  };

  useEffect(() => {
    const handler = (e) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleSortItemClick = (e) => {
    setSortValue(e.target.textContent);
    setIsSortOpen(false);
    if (e.target.textContent === "High to Low") {
      setFilteredPropertyData((prev) =>
        [...prev].sort((a, b) => b.rent - a.rent)
      );
    }
    if (e.target.textContent === "Low to High") {
      setFilteredPropertyData((prev) =>
        [...prev].sort((a, b) => a.rent - b.rent)
      );
    }
    if (e.target.textContent === "Latest") {
      setFilteredPropertyData((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    }
  };

  useEffect(() => {
    if (!query) {
      fetch("http://localhost:8000/properties-list")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setPropertyData(data.list);
          setFilteredPropertyData(data.list);
        });
    }
    if (query) {
      fetch(`http://localhost:8000/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setPropertyData(data);
          setFilteredPropertyData(data);
        });
    }
  }, []);

  return (
    <div className="product-list">
      <Navbar />
      <div className="products-section">
        <Filter
          className="filter-box"
          propertyData={propertyData}
          setFilteredPropertyData={setFilteredPropertyData}
          setPropertyData={setPropertyData}
        />
        <div className="products-list">
          <div className="top">
            <p>Total Property Find is: {filteredPropertyData.length}</p>
            <div
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="btn"
              ref={buttonRef}
            >
              <button>{sortValue}</button>
              {isSortOpen ? (
                <FaChevronUp className="icon" />
              ) : (
                <FaChevronDown className="icon" />
              )}
            </div>
            <div className="sort" style={sortStyle} ref={sortRef}>
              <ul>
                <li onClick={handleSortItemClick}>Latest</li>
                <li onClick={handleSortItemClick}>High to Low</li>
                <li onClick={handleSortItemClick}>Low to High</li>
                <li onClick={handleSortItemClick}>Most Popular</li>
              </ul>
            </div>
          </div>
          {filteredPropertyData.map((item) => {
            const fullImageUrl = `http://localhost:8000/${item.images[0].replace(
              /\\/g,
              "/"
            )}`;
            return (
              <PropertiesItem
                key={item._id}
                image={fullImageUrl}
                title={item.title}
                gender={item.genderPreference}
                type={item.propertyType}
                price={item.rent}
                internetBill={item.internetBill}
                waterBill={item.waterBill}
                electricityBill={item.electricityBill}
                id={item._id}
                city={item.city}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Properties;
