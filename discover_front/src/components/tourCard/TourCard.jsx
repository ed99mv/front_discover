import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./TourCard.css";

const TourCard = ({ tour, selectedTour }) => {
  const tourDetailsLink = `/tour-details/${tour.id}`;

  return (
    <div className="tour-card">
      <div className="carousel-container">
        {tour.images &&
          Array.isArray(tour.images) &&
          tour.images.length > 0 && (
            <Carousel showArrows={true} showThumbs={false} showStatus={false}>
              {tour.images.map((image, index) => (
                <div key={index} className="image-slide">
                  <img src={image} alt={`Image ${index}`} />
                </div>
              ))}
            </Carousel>
          )}
      </div>
      <div className="tour-details">
        <h2 className="tour-name">{tour.name}</h2>
        <p className="p-ubication">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-geo-alt-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
          </svg>
          <span style={{ color: "darkgrey" }}>{tour.ubication}</span>
        </p>
        <p className="agente">
          {tour.company && tour.company.name ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-house"
                viewBox="0 0 16 16"
              >
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
              </svg>{" "}
              Agente de viaje: <strong>{tour.company.name}</strong>
            </>
          ) : null}
        </p>{" "}
        <p>
          <strong>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cash"
              viewBox="0 0 16 16"
            >
              <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
              <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z" />
            </svg>{" "}
            ₡ {tour.price}
          </strong>{" "}
          por persona
        </p>
      </div>
      <a href={tourDetailsLink} className="card-link"></a>
    </div>
  );
};
export default TourCard;
