import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./App.css";
import Loading from "../loading/Loading";
import ModalToursCompanyID from "../ModalToursCompanyID/ModalToursCompanyID";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import CompanyDelete from "../companyDelete/CompanyDelete";

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
        console.log("Imagenes deatils company", tourData.images);

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
    <div
      data-bs-spy="scroll"
      data-bs-target="#navbar-example2"
      data-bs-root-margin="0px 0px -40%"
      data-bs-smooth-scroll="true"
      className="scrollspy-example bg-body-tertiary p-3 rounded-2"
      tabIndex="0"
    >
      <div className="row">
        {/* Columna izquierda para ImageGallery */}
        <div className="col-md-6">
          <div className="center-gallery">
            <ImageGallery className="image" items={images} />
          </div>
        </div>

        {/* Columna derecha para la información de la empresa */}
        <div className="col-md-6">
          <h2 id="scrollspyHeading1">Company Name</h2>
          <div className="home-icon">
            <i className="fas fa-home"></i>
            <span>{tourDetails.name}</span>
          </div>
          <hr />
          <h2 id="scrollspyHeading2">Company Ubication</h2>
          <div className="map-icon">
            <i className="fas fa-map-marker-alt"></i>
            <span>{tourDetails.ubication}</span>
          </div>
          <hr />

          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <Button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Descripción
                </Button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>{tourDetails.description}</p>
                </div>
              </div>
              <CompanyDelete />
            </div>

            <ModalToursCompanyID associatedTours={associatedTours} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CompanyDetails;
