import React, { useState, useEffect } from 'react';
import TourCard from '../tourCard/TourCard';

const TourGallery = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/tours');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const toursData = await response.json();
        setTours(toursData);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="gallery-container">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
};

export default TourGallery;
