import React, { useState, useEffect } from 'react';

const NewCompanyForm = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    description: '',
    ubication: '',
    images: [],
  });

  const [formMessage, setFormMessage] = useState(null);
  const [companies, setCompanies] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setCompanyData({ ...companyData, images: files });
  };

  const isFormValid = () => {
    // Verificar que los campos obligatorios no estén vacíos
    return companyData.name.trim() !== '' && companyData.ubication.trim() !== '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    if (!isFormValid()) {
      setFormMessage('Please fill in all required fields.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('company[name]', companyData.name);
      formData.append('company[description]', companyData.description);
      formData.append('company[ubication]', companyData.ubication);
      companyData.images.forEach((image) => {
        formData.append(`company[images][]`, image);
      });
  
      const response = await fetch('http://localhost:3001/api/v1/companies', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        setFormMessage('Company created successfully!');
        setCompanyData({
          name: '',
          description: '',
          ubication: '',
          images: [],
        });
        // Después de crear una nueva empresa, actualiza la lista de empresas
        fetchCompanies();
      } else {
        setFormMessage(`Error creating company: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error creating company: ${error.message}`);
      setFormMessage(`Error creating company: ${error.message}`);
    }
  };
  

  // Función para cargar la lista de empresas
  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/companies');
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

  // Efecto secundario para cargar la lista de empresas al montar el componente
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={companyData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={companyData.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Ubication:
          <input type="text" name="ubication" value={companyData.ubication} onChange={handleChange} />
        </label>
        <br />

        <label>
          Images:
          <input type='file' multiple onChange={handleImageChange} />
        </label>
        <button type="submit" disabled={!isFormValid()}>Create Company</button>

        {formMessage && <p>{formMessage}</p>}
      </form>

      <div>
        <h2>List of Companies</h2>
        <ul>
          {companies.map((company) => (
            <li key={company.id}>
              <p>Company Name: {company.name}</p>
              <br />
              <p>Company Description: {company.description}</p>
              <br />
              <p>Company Ubication: {company.ubication}</p>
              <p>Company Images:</p>
              <div>
            {company.images.map(imageUrl => (
              <img key={imageUrl} src={imageUrl} alt="Company" />
            ))}
          </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewCompanyForm;