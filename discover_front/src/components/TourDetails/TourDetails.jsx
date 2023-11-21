import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import Loading from "../loading/Loading";

const TourDetails = () => {
  const { id } = useParams();
  const [tourDetails, setTourDetails] = useState(null);
  const [tourImages, setTourImages] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/tours/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const tourData = await response.json();
        setTourDetails(tourData);

        const companyResponse = await fetch(
          `http://localhost:3001/api/v1/tours/${id}/company_id`
        );
        if (!companyResponse.ok) {
          throw new Error("Network response was not ok.");
        }
        const companyData = await companyResponse.json();
        setCompanyName(companyData.name);

        const imagesResponse = await fetch(
          `http://localhost:3001/api/v1/tours/${id}/galleries`
        );
        if (!imagesResponse.ok) {
          throw new Error("Network response was not ok.");
        }
        const imagesData = await imagesResponse.json();
        setTourImages(imagesData);
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    };

    fetchTourDetails();
  }, [id]);

  if (!tourDetails) {
    return (	<Loading/>	);
  }

  return (
    <div className="tour-details-container">
      <div className="image-gallery">
        {tourImages.map((image, index) => (
          <img
            key={index}
            src={image.photo_path}
            alt={`Image ${index}`}
            onClick={() => openImage(image)}
          />
        ))}
      </div>

      <div className="tour-details-content">
        <div className="header">
          <h2>{tourDetails.name}</h2>
          <p>{companyName}</p>
          <p className="location">📍 {tourDetails.ubication}</p>
          <p className="price">₡ {tourDetails.price} por persona</p>
        </div>

        <div className="description">
          <h3>Descripción</h3>
          <p>{tourDetails.description}</p>
        </div>
      </div>

      {selectedImage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeImage}>
              &times;
            </span>
            <img src={selectedImage.photo_path} alt="Selected Image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetails;
