import React, { useState, useEffect } from 'react';
import './App.css'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
        <a href={tourDetailsLink} className="card-link">  
          <h2 className="tour-name">{tour.name}</h2>
          <p>📍 {tour.ubication}</p>
          <p>🚤 {tour.companies.map(company => company.name).join(', ')}</p>
          <p><strong>₡ {tour.price}</strong> por persona</p>
        </a>
      </div>
    </div>
  );
};


// ... (código previo)

const TourGallery = () => {
  const [toursWithGalleriesAndCompanies, setToursWithGalleriesAndCompanies] = useState([]);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/tours');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const toursData = await response.json();

        const toursWithImages = await Promise.all(
          toursData.map(async (tour) => {
            const galleriesResponse = await fetch(`http://localhost:3001/api/v1/tours/${tour.id}/galleries`);
            if (!galleriesResponse.ok) {
              throw new Error('Network response was not ok.');
            }
            const galleriesData = await galleriesResponse.json();

            const photoPaths = galleriesData.map((gallery) => gallery.photo_path);

            // Fetch para obtener información de compañías asociadas a cada tour
            const companiesResponse = await fetch(`http://localhost:3001/api/v1/tours/${tour.id}/companies`);
            if (!companiesResponse.ok) {
              throw new Error('Network response was not ok.');
            }
            const companiesData = await companiesResponse.json();

            const companies = companiesData.map(company => ({
              id: company.id,
              name: company.name,
              // Otras propiedades de la compañía que desees incluir
            }));

            return {
              id: tour.id,
              name: tour.name,
              images: photoPaths,
              ubication: tour.ubication,
              companies: companies,
              price: tour.price
            };
          })
        );

        setToursWithGalleriesAndCompanies(toursWithImages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTourData();
  }, []);

  return (
    <div className="gallery-container">
      <div className="cards-container">
        {toursWithGalleriesAndCompanies.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default TourGallery;
