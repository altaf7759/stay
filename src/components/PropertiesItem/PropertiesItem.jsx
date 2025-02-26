import React, { useEffect, useState } from "react";
import "./PropertiesItem.css";

import { FaUser } from "react-icons/fa";
import { VscVerifiedFilled } from "react-icons/vsc";
import { IoHome } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FaWifi } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { MdElectricalServices } from "react-icons/md";
import { PiListNumbers } from "react-icons/pi";
import { FaCity } from "react-icons/fa";
import { data, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistUpdated } from "../../faetures/Wishlist/WishlistSlice";

const PropertiesItem = ({
  image,
  title,
  gender,
  type,
  price,
  electricityBill,
  waterBill,
  internetBill,
  id,
  city,
}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const wishlist = useSelector((state) => state.wishlist.wishlistData);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorite = wishlist.some((item) => item._id === id);
    setIsFavorite(favorite);
  }, [wishlist, id]);

  const openItem = () => {
    navigate(`/property/${id}`);
  };

  const handleFavoriteToggle = async () => {
    if (!user?.id) {
      alert("You need to be logged in to add properties to your wishlist.");
      return;
    }

    try {
      if (isFavorite) {
        // Logic for removing from wishlist (if implemented)
        const response = await fetch(
          `pleasant-comfort-stay-backend.up.railway.app/wishlist/remove/${user?.id}/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to remove to wishlist");
        }

        const data = response.json();
        dispatch(toggleWishlistUpdated());
        console.log(data);
      } else {
        // Logic for adding to wishlist
        const response = await fetch(
          `pleasant-comfort-stay-backend.up.railway.app/wishlist/add/${user?.id}/${id}`,
          {
            method: "POST",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to add to wishlist");
        }

        const data = await response.json();
        dispatch(toggleWishlistUpdated());
        console.log(data);
      }

      // Toggle the favorite state on success
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error handling wishlist toggle:", error);
      alert("An error occurred while updating the wishlist. Please try again.");
    }
  };

  return (
    <div className="all-items">
      <div className="items">
        <div className="item-img">
          <img src={image} alt={image} onClick={openItem} />
          <div className="rating">
            <IoMdStar />
            <IoMdStar />
            <IoMdStar />
            <IoMdStar />
            <IoIosStarOutline />
          </div>
          <p className="img-label">For Rent</p>
        </div>
        <div className="item-desc">
          <div className="favorite" onClick={handleFavoriteToggle}>
            {isFavorite ? (
              <MdFavorite className="favorite-icon" />
            ) : (
              <MdFavoriteBorder className="favorite-icon" />
            )}
          </div>
          <div className="item-title">
            <h3 onClick={openItem}>{title}</h3>
          </div>
          <div className="desc">
            <div className="sortInfo">
              <div className="item-type">
                <IoHome />
                <span>Type:</span>
                <p>{type}</p>
              </div>
              <div className="item-gender">
                <FaUser />
                <span>Gender:</span>
                <p>{gender}</p>
              </div>
              <div className="item-city">
                <FaCity />
                <span>City:</span>
                <p>{city}</p>
              </div>
            </div>
            <div className="includedBills">
              <span className="billsLabel">
                <PiListNumbers className="billsLabelIcon" /> Included Bills:{" "}
              </span>
              <div className="billsList">
                {internetBill && (
                  <p>
                    <FaWifi /> Internet
                  </p>
                )}
                {waterBill && (
                  <p>
                    <IoIosWater /> Water
                  </p>
                )}
                {electricityBill && (
                  <p>
                    <MdElectricalServices /> Electricity
                  </p>
                )}
              </div>
            </div>
            <div className="item-verify">
              <VscVerifiedFilled />
              <span>Verified</span>
            </div>
          </div>
          <div className="payment">
            <div className="pricing">
              <MdOutlineCurrencyRupee />
              <p>
                {price} / <span>Per month</span>
              </p>
              <p className="bill-inc">Bill Included</p>
            </div>
            <div className="more-info">
              <p onClick={openItem}>More Info</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesItem;
