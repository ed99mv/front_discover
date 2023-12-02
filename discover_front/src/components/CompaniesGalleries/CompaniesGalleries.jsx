import React, { useState, useEffect } from "react";
import CompanyCard from "../CompanyCard/CompanyCard";

function CompaniesGalleries() {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/companies");
      if (response.ok) {
        const companiesData = await response.json();
        setCompanies(companiesData);
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

  return(
    <>
        <ul>
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company}/>
          ))}
        </ul>
      </>
  )
}

export default CompaniesGalleries;
