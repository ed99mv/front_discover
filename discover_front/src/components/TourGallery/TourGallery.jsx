import React, { useState, useEffect } from 'react';
import TourCard from '../tourCard/TourCard';
import Loading from '../loading/Loading';
const TourGallery = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/tours');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const toursData = await response.json();
        
        // Obtener el nombre de compañía para cada tour
        const toursWithCompanyDetails = await Promise.all(
          toursData.map(async (tour) => {
            const companyResponse = await fetch(`http://localhost:3001/api/v1/tours/${tour.id}/company_id`);
            if (!companyResponse.ok) {
              throw new Error('Failed to fetch company details.');
            }
            const companyData = await companyResponse.json();
            return { ...tour, company: companyData };
          })
        );

        setTours(toursWithCompanyDetails);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, []);

  if (isLoading) {
    return <Loading />; 
  }

  return (
    <div className="gallery-container">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
};

export default TourGallery;
