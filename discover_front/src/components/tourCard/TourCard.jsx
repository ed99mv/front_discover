import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./TourCard.css";

const TourCard = ({ tour }) => {
  const tourDetailsLink = `/tour-details/${tour.id}`;

  return (
    <div className="tour-card">
      <div className="carousel-container">
        <Carousel showArrows={true} showThumbs={false} showStatus={false}>
          {tour.images.map((image, index) => (
            <div key={index} className="image-slide">
              <img src={image} alt={`Image ${index}`} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="tour-details">
        <h2 className="tour-name">{tour.name}</h2>
        <p>📍 {tour.ubication}</p>
        <p>
          Agente de viaje:{" "}
          <strong>{tour.company ? tour.company.name : "No Seleccionaste una compañía"}</strong>
        </p>{" "}
        <p>
          <strong>₡ {tour.price}</strong> por persona
        </p>
      </div>
      <a href={tourDetailsLink} className="card-link"></a>
    </div>
  );
};

export default TourCard;
