import React, { useEffect, useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Store autocomplete suggestions
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(""); // Store selected city name
  const [isFocused, setIsFocused] = useState(false); // Track input focus state

  const handleSearch = (e) => {
    e.preventDefault();
    if (!selectedCity) {
      alert("Please select a valid city name from the suggestions.");
      return;
    }
    navigate(`/search?query=${selectedCity}`);
  };

  const fetchSuggestions = async (query) => {
    if (query.trim() !== "") {
      const response = await fetch(
        `https://api.locationiq.com/v1/autocomplete.php?key=pk.a591f2c6fb9a072f59022fb97b2f5ccb&q=${query}&tag=place:city,place:town,place:village&limit=5&countrycodes=IN`
      );

      const data = await response.json();

      const citySuggestions = data.map((item) => ({
        name: item.address.name || item.address.city || item.address.town, // Extract city name
        fullAddress: item.display_name, // Full display name
      }));
      setSuggestions(citySuggestions);
    } else {
      setSuggestions([]);
      setSelectedCity("");
      setSearchQuery("");
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSuggestions(query); // Fetch city suggestions
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.fullAddress); // Show full address in input for clarity
    setSelectedCity(suggestion.name); // Extracted city name for database query
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="search">
        <h1 className="heading-text">
          Find the Perfect Place to Call Home Away from Home.
        </h1>
        <div className="search-box">
          <div style={{ position: "relative", width: "100%" }}>
            <input
              onChange={handleInputChange}
              type="text"
              value={searchQuery}
              placeholder="Search here..."
              onFocus={() => setIsFocused(true)} // Show suggestions on focus
              onBlur={() => setIsFocused(false)} // Hide suggestions on blur
            />
            {isFocused && suggestions.length > 0 && (
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
                  zIndex: 1000,
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    style={{
                      padding: "8px",
                      cursor: "pointer",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                    onMouseDown={() => handleSuggestionClick(suggestion)} // Use onMouseDown instead of onClick
                  >
                    {suggestion.name} - {suggestion.fullAddress}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <button className="searchButton" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
