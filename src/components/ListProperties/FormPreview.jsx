import React from "react";
import ShowBtns from "./ShowBtns";
import { useSelector } from "react-redux";

function FormPreview() {
  const property = useSelector((state) => state.property);

  const renderAmenity = (label, value) => (
    <div className="preview-item">
      <strong>{label}:</strong> {value ? "Yes" : "No"}
    </div>
  );

  return (
    <div className="preview">
      <h4>Property Preview</h4>
      <div className="preview-container">
        {/* Property Details Section */}
        <div className="preview-section">
          <h5>Basic Details</h5>
          <div className="preview-item">
            <strong>Property Type:</strong> {property.propertyType || "N/A"}
          </div>
          <div className="preview-item">
            <strong>Title:</strong> {property.title || "N/A"}
          </div>
          <div className="preview-item">
            <strong>Description:</strong> <p>{property.description || "N/A"}</p>
          </div>
        </div>

        {/* Location Details Section */}
        <div className="preview-section">
          <h5>Location Details</h5>
          <div className="preview-item">
            <strong>City:</strong> {property.city || "N/A"}
          </div>
          <div className="preview-item">
            <strong>Area:</strong> {property.area || "N/A"}
          </div>
          <div className="preview-item">
            <strong>Landmark:</strong> {property.landmark || "N/A"}
          </div>
          <div className="preview-item">
            <strong>Pincode:</strong> {property.pincode || "N/A"}
          </div>
        </div>

        {/* Rent and Billing Section */}
        <div className="preview-section">
          <h5>Rent and Billing</h5>
          <div className="preview-item">
            <strong>Rent:</strong> {property.rent || "N/A"}
          </div>
          <div className="preview-item">
            <strong>Deposit:</strong> {property.deposite || "N/A"}
          </div>
          <div className="preview-item">
            <strong>Electricity Bill:</strong>{" "}
            {property.electricityBill ? "Yes" : "No"}
          </div>
          <div className="preview-item">
            <strong>Internet Bill:</strong>{" "}
            {property.internetBill ? "Yes" : "No"}
          </div>
          <div className="preview-item">
            <strong>Water Bill:</strong> {property.waterBill ? "Yes" : "No"}
          </div>
          <div className="preview-item">
            <strong>Maintenance:</strong> {property.maintenance || "N/A"}
          </div>
        </div>

        {/* Features Section */}
        <div className="preview-section">
          <h5>Features and Amenities</h5>
          <div className="preview-item">
            <strong>Furnishing Status:</strong>{" "}
            {property.furnishingStatus || "N/A"}
          </div>
          <div className="preview-item">
            <strong>Occupancy Type:</strong> {property.occupancyType || "N/A"}
          </div>
          {renderAmenity("Parking", property.facilities.parking)}
          {renderAmenity("CCTV", property.facilities.cctv)}
          {renderAmenity("Laundry", property.facilities.laundry)}
          {renderAmenity("AC", property.facilities.ac)}
          {renderAmenity("Geyser", property.facilities.geyser)}
          {renderAmenity("Cooler", property.facilities.cooler)}
          {renderAmenity("Gym", property.facilities.gym)}
          {renderAmenity("Lift", property.facilities.lift)}
          {renderAmenity("Power Backup", property.facilities.powerBackup)}
        </div>

        {/* Rules Section */}
        <div className="preview-section">
          <h5>Rules and Restrictions</h5>
          <div className="preview-item">
            <strong>Preferred Tenants:</strong>{" "}
            {property.tenantPreference || "N/A"}
          </div>
          <div className="preview-item">
            <strong>Preferred Gender:</strong>{" "}
            {property.genderPreference || "N/A"}
          </div>
          <div className="preview-item">
            <strong>Smoking Allowed:</strong> {property.smokingAllowed || "No"}
          </div>
          <div className="preview-item">
            <strong>Alcohol Allowed:</strong> {property.alcoholAllowed || "No"}
          </div>
          <div className="preview-item">
            <strong>Pets Allowed:</strong> {property.petsAllowed || "No"}
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="preview-section">
          <h5>Contact Information</h5>
          <div className="preview-item">
            <strong>Owner Name:</strong> {property.ownerName || "N/A"}
          </div>
          <div className="preview-item">
            <strong>Phone Number:</strong> {property.phoneNumber || "N/A"}
          </div>
          <div className="preview-item">
            <strong>Email Id:</strong> {property.email || "N/A"}
          </div>
        </div>

        {/* Media Section */}
        <div className="preview-section">
          <h5>Images and Media</h5>
          <div>
            <strong>Images:</strong>
            {property.images && property.images.length > 0 ? (
              <div className="images-container">
                {property.images.map((img, key) => (
                  <img
                    src={img}
                    key={key}
                    alt={`Property image ${key + 1}`}
                    width="120px"
                  />
                ))}
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>
          <div className="video-container">
            <strong>Video:</strong>
            <br />
            {property.video ? (
              <video src={property.video} width="350px" controls></video>
            ) : (
              <p>No video available</p>
            )}
          </div>
        </div>
      </div>
      <ShowBtns />
    </div>
  );
}

export default FormPreview;
