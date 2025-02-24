import React, { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import PropertiesItem from "../PropertiesItem/PropertiesItem";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState([]);
  const [activeBtn, setActiveBtn] = useState(0);
  const user = useSelector((state) => state.user);
  const wishlist = useSelector((state) => state.wishlist?.wishlistData);

  useEffect(() => {
    fetch(`https://stay-backend.onrender.com/profile/${userId}`)
      .then((response) => response.json())
      .then((data) => setPropertyData(data.list))
      .catch((error) => {
        console.error(error);
        alert("Error in Fetching Property");
      });
  }, []);

  const handleTabs = (index) => {
    setActiveBtn(index);
  };

  return (
    <>
      <Navbar />
      <div className="profileContainer">
        <div className="profileBasicDetails">
          <div className="nameEmail">
            <p>{user && user.name}</p>
            <p>{user && user.email}</p>
          </div>
          <div className="userImage">
            {user?.name?.[0].toUpperCase()}
            <button>Edit Your Profile</button>
          </div>
        </div>
        <div className="slider">
          <div className="tabs">
            <div
              className="slider-bg"
              style={{
                transform: `translateX(${activeBtn * 1.167 * 100}%)`,
              }}
            />
            {[
              "Your Properties",
              "Reviews & Ratings",
              "Favorite Properties",
            ].map((item, index) => (
              <div
                key={index}
                style={index === activeBtn ? { color: "white" } : {}}
                onClick={() => handleTabs(index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="myProperties">
          {activeBtn === 0 && (
            <p className="propertyLength">
              Total Properties: {propertyData.length}
            </p>
          )}
          {activeBtn === 0 &&
            propertyData.map((item) => {
              const fullImageUrl = `https://stay-backend.onrender.com/${item?.images[0]?.replace(
                /\\/g,
                "/"
              )}`;
              return (
                <>
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
                  <div className="editRemove">
                    <button
                      onClick={() => {
                        navigate(`/property/edit/${item._id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        navigate(`/property/remove/${item._id}`);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </>
              );
            })}
          {activeBtn === 1 && (
            <p className="reviews-section">No Reviews & Ratings Yet</p>
          )}
          {activeBtn === 2 && (
            <div className="showFavoriteProperties">
              <p className="favorite-properties-count">
                Total Favorite Properties: {wishlist.length}
              </p>
              {wishlist
                ? wishlist.map((item) => {
                    const fullImageUrl = `https://stay-backend.onrender.com/${item.images[0].replace(
                      /\\/,
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
                  })
                : "No"}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
