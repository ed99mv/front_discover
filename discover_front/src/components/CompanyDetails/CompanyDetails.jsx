import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import Loading from "../loading/Loading";
import ModalToursCompanyID from "../ModalToursCompanyID/ModalToursCompanyID";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function CompanyDetails() {
  const { id } = useParams();
  const [tourDetails, setTourDetails] = useState(null);
  const [associatedTours, setAssociatedTours] = useState([]);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/companies/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const tourData = await response.json();
        setTourDetails(tourData);

        // Obtener los tours asociados a esta compañía
        const associatedToursResponse = await fetch(
          `http://localhost:3001/api/v1/companies/${id}/associated_tours`
        );
        if (!associatedToursResponse.ok) {
          throw new Error("Failed to fetch associated tours.");
        }
        const associatedToursData = await associatedToursResponse.json();
        setAssociatedTours(associatedToursData);
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    };
    fetchCompanyDetails();
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
        </div>

        <div className="description">
          <h3>Descripción</h3>
          <p>{tourDetails.description}</p>
          <p className="location">📍 {tourDetails.ubication}</p>
          <ModalToursCompanyID associatedTours={associatedTours} />
          <div className="center-gallery">
            <ImageGallery items={images} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
