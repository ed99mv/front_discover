import React, { useState, useEffect } from "react";
import CompanyCard from "../CompanyCard/CompanyCard";
import Loading from '../loading/Loading';

function CompaniesGalleries() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/companies");
      if (response.ok) {
        const companiesData = await response.json();
        setCompanies(companiesData);
        setIsLoading(false);
      } else {
        console.error(`Error fetching companies: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error fetching companies: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  if (isLoading) {
    return <Loading />; 
  }

  return (
    <>
      <ul>
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </ul>
    </>
  );
}

export default CompaniesGalleries;
