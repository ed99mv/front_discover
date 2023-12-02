import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import Loading from "../loading/Loading";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const TourDetails = () => {
  const { id } = useParams();
  const [tourDetails, setTourDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [companyName, setCompanyName] = useState("");

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

        // Obtener detalles de la compañía por su ID
        const companyResponse = await fetch(
          `http://localhost:3001/api/v1/tours/${id}/company_id`
        );
        if (!companyResponse.ok) {
          throw new Error("Failed to fetch company name.");
        }
        const companyData = await companyResponse.json();
        setCompanyName(companyData.name);
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    };

    fetchTourDetails();
  }, [id]);

  if (!tourDetails) {
    return <Loading />;
  }

  const images = tourDetails.images.map((image, index) => ({
    original: image,
    thumbnail: image,
    description: `Image ${index + 1}`,
    originalClass: "image-gallery-image",
  }));

  return (
    <div className="tour-details-container">
      <div className="tour-details-content">
        <div className="header">
          <h2>{tourDetails.name}</h2>
          <p>{companyName}</p>
        </div>

        <div className="description">
          <h3>Descripción</h3>
          <p>{tourDetails.description}</p>
        </div>
      </div>
      <p className="location">📍 {tourDetails.ubication}</p>
      <p className="price">₡ {tourDetails.price} por persona</p>
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
      <div className="center-gallery">
        <ImageGallery items={images} />
      </div>
    </div>
  );
};

export default TourDetails;
