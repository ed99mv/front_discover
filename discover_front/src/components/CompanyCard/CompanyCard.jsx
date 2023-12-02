import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CompanyCard({company}) {
    const companyDetailsLink = `/companydetails/${company.id}`;
  return (
    <div className="tour-card">
      <div className="carousel-container">
        <Carousel showArrows={true} showThumbs={false} showStatus={false}>
          {company.images.map((image, index) => (
            <div key={index} className="image-slide">
              <img src={image} alt={`Image ${index}`} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="tour-details">
        <h2 className="tour-name">{company.name}</h2>
        <p>📍 {company.ubication}</p>
      </div>
      <a href={companyDetailsLink} className="card-link"></a>
    </div>
  )
}

export default CompanyCard