import React, { useState, useEffect } from 'react';
import './App.css'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const TourCard = ({ tour }) => {
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
        <h2 className="tour-name">{tour.name}</h2>
      </div>
    </div>
  );
};


const TourGallery = () => {
  const [toursWithGalleries, setToursWithGalleries] = useState([]);

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

            return {
              id: tour.id,
              name: tour.name,
              images: photoPaths,
            };
          })
        );

        setToursWithGalleries(toursWithImages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTourData();
  }, []);

  return (
    <div className="gallery-container">

      <div className="cards-container">
        {toursWithGalleries.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default TourGallery;
