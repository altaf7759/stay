import React, { useEffect, useState } from "react";
import "./ShowDetails.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";

import { FaCirclePlay } from "react-icons/fa6";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaCity } from "react-icons/fa";
import { FaLandmark } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { MdPinDrop } from "react-icons/md";
import { PiHandDepositFill } from "react-icons/pi";
import { GrVmMaintenance } from "react-icons/gr";
import { MdOutlineElectricalServices } from "react-icons/md";
import { IoIosWater } from "react-icons/io";
import { FaWifi } from "react-icons/fa";
import { PiMotorcycleFill } from "react-icons/pi";
import { BiSolidCctv } from "react-icons/bi";
import { MdLocalLaundryService } from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";
import { GiCooler } from "react-icons/gi";
import { FaHotTub } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { RiGroup3Fill } from "react-icons/ri";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { FaTransgenderAlt } from "react-icons/fa";
import { MdOutlineSmokingRooms } from "react-icons/md";
import { BiSolidDrink } from "react-icons/bi";
import { MdOutlinePets } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistUpdated } from "../../faetures/Wishlist/WishlistSlice";

function ShowDetails() {
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [bigImg, setBigImg] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const wishlist = useSelector((state) => state.wishlist.wishlistData);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorite = wishlist.some((item) => item._id === id);
    setIsFavorite(favorite);
  }, [wishlist, id]);
  console.log(isFavorite);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(
          `https://stay-backend.onrender.com/property/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
        setPropertyDetails(data.property);
      } catch (error) {
        setError(error.message); // Set error state
        console.error("Error fetching property details:", error);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handleFavorite = async () => {
    if (!user.id) {
      alert("You need to logged in to add properties in wishlist");
      return;
    }

    try {
      if (isFavorite) {
        // Logic for removing from wishlist (if implemented)
        const response = await fetch(
          `https://stay-backend.onrender.com/wishlist/remove/${user?.id}/${id}`,
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
          `https://stay-backend.onrender.com/wishlist/add/${user?.id}/${id}`,
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

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  if (!propertyDetails) {
    return <div>Loading...</div>;
  }

  const firstImage =
    propertyDetails.images && propertyDetails.images.length > 0
      ? `https://stay-backend.onrender.com/${propertyDetails.images[0].replace(
          /\\/g,
          "/"
        )}`
      : null;

  const allImages =
    propertyDetails.images && propertyDetails.images.length > 0 ? (
      propertyDetails.images.map((img, key) => {
        const fullImageUrl = `https://stay-backend.onrender.com/${img.replace(
          /\\/g,
          "/"
        )}`;
        return (
          <img
            src={fullImageUrl}
            alt={`Property Image ${key + 1}`}
            key={key}
            width="130px"
            onClick={() => {
              setBigImg(fullImageUrl);
            }}
            className={bigImg === fullImageUrl ? "active-img" : ""}
          />
        );
      })
    ) : (
      <p>No Images Available</p>
    );

  const video =
    propertyDetails.video &&
    propertyDetails.video.length > 0 &&
    typeof propertyDetails.video[0] === "string" ? (
      <video
        src={`https://stay-backend.onrender.com/${propertyDetails.video[0].replace(
          /\\/g,
          "/"
        )}`}
        onClick={(e) => {
          setBigImg(e.target.src);
        }}
        className={
          bigImg ===
          `https://stay-backend.onrender.com/${propertyDetails.video[0].replace(
            /\\/g,
            "/"
          )}`
            ? "active-img"
            : ""
        }
      >
        Your browser does not support the video tag.
      </video>
    ) : (
      <p>Video Not Available</p>
    );

  return (
    <>
      <Navbar />
      <div className="property-details">
        <div className="imagesAndDetails">
          <div className="imagesSection">
            <div className="fullImg">
              {firstImage ? (
                bigImg ===
                `https://stay-backend.onrender.com/${propertyDetails.video[0].replace(
                  /\\/g,
                  "/"
                )}` ? (
                  <video
                    src={bigImg}
                    width="100%"
                    height="100%"
                    controls
                  ></video>
                ) : (
                  <img
                    src={bigImg ? bigImg : firstImage}
                    alt="Property Image"
                    width="100%"
                  />
                )
              ) : (
                <p>No image available</p>
              )}
              <div className="favorite-icon" onClick={handleFavorite}>
                {isFavorite ? (
                  <MdFavorite className="favorite-icon favorite" />
                ) : (
                  <MdFavoriteBorder className="favorite-icon favorite" />
                )}
              </div>
            </div>
            <div className="allImgs">
              <div className="video">
                {video}
                <FaCirclePlay className="playIcon" />
              </div>
              {allImages}
            </div>
            <hr />
            <div className="locationsDetails">
              <h4>Location Details</h4>
              <div>
                <p className="location">
                  <FaCity />
                  <span>City:</span> {propertyDetails.city}
                </p>
                <p className="location">
                  <FaLandmark />
                  <span>Area:</span> {propertyDetails.area}
                </p>
                {propertyDetails.landmark && (
                  <p className="location">
                    <FaRoute />
                    <span>Landmark:</span> {propertyDetails.landmark}
                  </p>
                )}
                <p className="location">
                  <MdPinDrop />
                  <span>Pincode:</span> {propertyDetails.pincode}
                </p>
              </div>
            </div>
            <hr />
            <div className="rentsAndBilling">
              <h4>Rend And Billings</h4>
              <div>
                <p className="location">
                  <MdOutlineCurrencyRupee />
                  <span>Monthly Rent:</span> {propertyDetails.rent}
                </p>
                {propertyDetails.deposite && (
                  <p className="location">
                    <PiHandDepositFill />
                    <span>Deposit:</span> {propertyDetails.deposite}
                  </p>
                )}
                {propertyDetails.maintenance && (
                  <p className="location">
                    <GrVmMaintenance />
                    <span>Maintenance:</span> {propertyDetails.maintenance}
                  </p>
                )}
                <p className="location">
                  <MdOutlineElectricalServices />
                  <span>Electricity Bill:</span>
                  {propertyDetails.electricityBill
                    ? "Included"
                    : "Not Included"}
                </p>
                <p className="location">
                  <FaWifi />
                  <span>Internet Bill:</span>{" "}
                  {propertyDetails.internetBill ? "Included" : "Not Included"}
                </p>
                <p className="location">
                  <IoIosWater />
                  <span>water Bill:</span>{" "}
                  {propertyDetails.waterBill ? "Included" : "Not Included"}
                </p>
              </div>
            </div>
            <hr />
            <div className="property-features">
              <h4>Features</h4>
              <div>
                <p className="location">
                  <IoIosBed />
                  <span>Furnishing Status:</span>{" "}
                  {propertyDetails.furnishingStatus}
                </p>
                <p className="location">
                  <RiGroup3Fill />
                  <span>Occupancy Type:</span> {propertyDetails.occupancyType}
                </p>
                <p className="location">
                  <PiMotorcycleFill />
                  <span>Parking:</span>{" "}
                  {propertyDetails.facilities.parking == "Yes"
                    ? "Available"
                    : "Not Available"}
                </p>
                <p className="location">
                  <BiSolidCctv />
                  <span>CCTV:</span>{" "}
                  {propertyDetails.facilities.cctv == "Yes"
                    ? "Available"
                    : "Not Available"}
                </p>
                <p className="location">
                  <MdLocalLaundryService />
                  <span>Laundry:</span>{" "}
                  {propertyDetails.facilities.laundry == "Yes"
                    ? "Available"
                    : "Not Available"}
                </p>
                <p className="location">
                  <GiCooler />
                  <span>Cooler:</span>{" "}
                  {propertyDetails.facilities.cooler == "Yes"
                    ? "Available"
                    : "Not Available"}
                </p>
                <p className="location">
                  <TbAirConditioning />
                  <span>AC:</span>{" "}
                  {propertyDetails.facilities.ac == "Yes"
                    ? "Available"
                    : "Not Available"}
                </p>
                <p className="location">
                  <FaHotTub />
                  <span>Geyser:</span>{" "}
                  {propertyDetails.facilities.geyser == "Yes"
                    ? "Available"
                    : "Not Available"}
                </p>
              </div>
            </div>
            <hr />
            <div className="property-features">
              <h4>Rules & Restrictions</h4>
              <div>
                <p className="location">
                  <MdOutlineFamilyRestroom />
                  <span>Tenants Preference:</span>{" "}
                  {propertyDetails.tenantPreference}
                </p>
                <p className="location">
                  <FaTransgenderAlt />
                  <span>Gender Preference:</span>{" "}
                  {propertyDetails.genderPreference}
                </p>
                <p className="location">
                  <MdOutlineSmokingRooms />
                  <span>Smoking Allowed:</span>{" "}
                  {propertyDetails.smokingAllowed == "Yes" ? "Yes" : "No"}
                </p>
                <p className="location">
                  <BiSolidDrink />
                  <span>Alcohol Allowed:</span>{" "}
                  {propertyDetails.alcoholAllowed == "Yes" ? "Yes" : "No"}
                </p>
                <p className="location">
                  <MdOutlinePets />
                  <span>Pets Allowed:</span>{" "}
                  {propertyDetails.petsAllowed == "Yes" ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
          <div className="itemBasicDetails">
            <h2>{propertyDetails.title}</h2>
            <p>{propertyDetails.description}</p>
            <p className="pType">
              <IoHome />
              <span>Property Type:</span>
              {propertyDetails.propertyType}
            </p>
            <div className="rentAmount">
              <span>
                <MdOutlineCurrencyRupee /> {propertyDetails.rent} /month
              </span>
            </div>
            <div className="contactOwner">
              <p className="pType">
                <IoPersonSharp />
                <span>Owner Name:</span>
                {propertyDetails.ownerName}
              </p>
              <p className="pType">
                <FaPhoneVolume />
                <span>Phone Number:</span>
                {propertyDetails.phoneNumber}
              </p>
              {propertyDetails.email && (
                <p className="pType">
                  <MdEmail />
                  <span>Email:</span>
                  {propertyDetails.email}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShowDetails;
