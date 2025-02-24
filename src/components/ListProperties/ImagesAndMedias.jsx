import React, { useEffect, useState } from "react";
import ShowBtns from "./showBtns";
import { setImagesAndMedia } from "../../faetures/PropertyForm/PropertySlice";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../faetures/PropertyForm/stepSlice";

function ImagesAndMedias() {
  const property = useSelector((state) => state.property);
  const step = useSelector((state) => state.step);
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState("");

  useEffect(() => {
    if (property.images.length > 0 || property.video != null) {
      setImages(property.images || []);
      setVideo(property.video || "");
    }
  }, [property]);

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prev) => [...prev, ...files]);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateMedias = () => {
    const imagesError = document.querySelector(".imagesError");
    let isValid = true;

    if (images.length === 0) {
      imagesError.innerHTML = "Please select images";
      isValid = false;
    } else {
      imagesError.innerHTML = "";
    }

    return isValid;
  };

  const handleMedias = () => {
    if (validateMedias()) {
      dispatch(
        setImagesAndMedia({
          images: images,
          video: video,
          isMedias: true,
        })
      );
    } else {
      dispatch(setStep(step - 1));
    }
  };

  return (
    <>
      <h4>Images and Medias</h4>
      <div className="imagesAndMedia">
        <div className="images">
          <label htmlFor="img">Upload Images:</label>
          <input
            type="file"
            multiple
            accept=".jpg,.png,.jpeg"
            id="img"
            onChange={handleImagesChange}
          />
          <span className="imagesError"></span>
        </div>
        <div className="imagesPrev">
          {images.map((img, index) => (
            <div key={index} style={{ display: "inline-block", margin: "5px" }}>
              <img
                src={img}
                alt={`Preview ${index}`}
                style={{ width: "120px" }}
              />
              <button
                style={{
                  display: "block",
                  width: "100%",
                  fontSize: "10px",
                  textAlign: "center",
                  color: "red",
                  border: "none",
                  background: "transparent",
                  fontFamily: "poppins",
                  margin: "0px auto",
                  cursor: "pointer",
                }}
                onClick={() => handleRemoveImage(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="videos">
          <label htmlFor="vid">Upload Video:</label>
          <input
            type="file"
            accept="video"
            id="vid"
            onChange={handleVideoChange}
          />
        </div>
        <div className="videoPrev">
          {video && (
            <video width="400" controls>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
      <ShowBtns handleMedias={handleMedias} />
    </>
  );
}

export default ImagesAndMedias;
