import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Carousel, Modal, Button } from "react-bootstrap";
import "./App.css";
import Loading from "../loading/Loading";
import TourDelete from "../TourDelete/TourDelete";
import ContactUs from "../../contactUs/ContactUs";

const TourDetails = () => {
  const { id } = useParams();
  const [tourDetails, setTourDetails] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCarousel, setShowCarousel] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companyUserEmail, setCompanyUserEmail] = useState("");

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const toggleCarousel = () => {
    setShowCarousel(!showCarousel);
  };

  const handleCompanyClick = () => {
    window.location.href = `/companydetails/${companyId}`;
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
          throw new Error("Failed to fetch company name.");
        }
        const companyData = await companyResponse.json();
        setCompanyName(companyData.name);
        setCompanyId(companyData.id);
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    };

    fetchTourDetails();
  }, [id]);

  useEffect(() => {
    const fetchCompanyUserEmail = async () => {
      try {
        const userEmailResponse = await fetch(
          `http://localhost:3001/api/v1/tours/${id}/user_email_for_tour`
        );
        if (!userEmailResponse.ok) {
          throw new Error("Failed to fetch company user email.");
        }
        const userEmailData = await userEmailResponse.json();
        setCompanyUserEmail(userEmailData.email);
        console.log(userEmailData);
      } catch (error) {
        console.error("Error fetching company user email:", error);
      }
    };

    if (companyUserEmail === "") {
      fetchCompanyUserEmail();
    }
  }, [id, companyUserEmail]);

  if (!tourDetails) {
    return <Loading />;
  }

  return (
    <div>
      <div className="tour-details-container">
        <div className="row">
          <div className="col-md-6">
            {/* Primera columna: Galería de imágenes */}
            <div className="image-gallery">
              {tourDetails.images.slice(0, 3).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index}`}
                  onClick={() => openImage({ photo_path: image })}
                />
              ))}
            </div>

            {tourDetails.images.length > 3 && (
              <Button
                className="view-all-btn"
                onClick={toggleCarousel}
                style={{
                  backgroundColor: "lightseagreen",
                  color: "white",
                  fontWeight: "bold",
                  margin: "10px",
                  border: "1px white",
                }}
              >
                Ver Todas las Imágenes
              </Button>
            )}
            <ContactUs toEmail={companyUserEmail} />
          </div>

          <div className="col-md-6">
            {/* Segunda columna: Detalles del tour */}
            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar-example2"
              data-bs-root-margin="0px 0px -40%"
              data-bs-smooth-scroll="true"
              className="scrollspy-example bg-body-tertiary p-3 rounded-2"
              tabIndex="0"
            >
              <div className="tour-details-content">
                <div className="header">
                  <h2 className="titulo-detalles">{tourDetails.name}</h2>
                  <div className="home-icon">
                    <i className="fas fa-home"></i>
                    <span onClick={handleCompanyClick} className="span">
                      {companyName}
                    </span>
                  </div>
                  <div className="map-icon">
                    <i className="fas fa-map-marker-alt"></i>
                    <span className="span">{tourDetails.ubication}</span>
                  </div>
                  <div className="money-bill-icon">
                    <i className="fas fa-money-bill"></i>
                    <span className="span">
                      ₡ {tourDetails.price} por persona
                    </span>
                  </div>
                </div>

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
                  </div>
                  <TourDelete />
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedImage && (
          <Modal show={true} onHide={closeImage}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <img src={selectedImage.photo_path} alt="Selected Image" />
            </Modal.Body>
          </Modal>
        )}

        {showCarousel && (
          <Modal show={true} onHide={toggleCarousel}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <Carousel>
                {tourDetails.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt={`Image ${index}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TourDetails;
