import React, { useState, useEffect } from "react";
import "./NewTourForm.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useContext } from "react";
import { AuthContext } from "../../authContext";


const NewTourForm = () => {
  const { authToken } = useContext(AuthContext);
  const { userId } = useContext(AuthContext);
  
  const [tourData, setTourData] = useState({
    name: "",
    description: "",
    price: "",
    ubication: "",
    images: [],
    companyId: "", // Agregar el campo companyId para almacenar la compañía seleccionada
  });

  const [userCompanies, setUserCompanies] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setTourData({ ...tourData, images: files });
  };

  const handleCompanyChange = (event) => {
    setTourData({ ...tourData, companyId: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("tour[name]", tourData.name);
    formData.append("tour[description]", tourData.description);
    formData.append("tour[price]", tourData.price);
    formData.append("tour[ubication]", tourData.ubication);
    formData.append("tour[companyId]", tourData.companyId); // Agregar companyId al formulario
    tourData.images.forEach((image) => {
      formData.append(`tour[images][]`, image);
    });

    try {
      const response = await fetch("http://localhost:3001/api/v1/tours", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al crear el tour");
      }

      const createdTour = await response.json();
      console.log("Tour creado:", createdTour);
      // Manejar la respuesta después de crear el tour
    } catch (error) {
      console.error("Error al crear el tour:", error);
    }
  };

  useEffect(() => {
    console.log("Valor del authToken:", userId);
    console.log(authToken);
    const fetchUserCompanies = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/tours/${userId}/user_companies`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`, 
              'Content-Type': 'application/json'
            },
            credentials: "include", 
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener las compañías del usuario");
        }

        const data = await response.json();
        setUserCompanies(data.userCompanies);
      } catch (error) {
        console.error("Error al obtener las compañías:", error);
      }
    };

    fetchUserCompanies();
  }, []);

  return (
    <form className="tour-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={tourData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={tourData.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Ubication:
        <textarea
          name="ubication"
          value={tourData.ubication}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={tourData.price}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Images:
        <input type="file" multiple onChange={handleImageChange} />
      </label>

      <label>
        Company:
        <select value={tourData.companyId} onChange={handleCompanyChange}>
          <option value="">Select a company</option>
          {userCompanies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Crear Tour</button>
    </form>
  );
};

export default NewTourForm;
