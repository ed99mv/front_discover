import React, { useState, useEffect } from "react";
// import "./NewTourForm.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useContext } from "react";
import { AuthContext } from "../../authContext";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Input,
  Label,
} from "reactstrap";  

const NewTourForm = ({ isOpen, toggleModal }) => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { authToken, userId } = useContext(AuthContext);
  const [address, setAddress] = useState("");
  const [tourData, setTourData] = useState({
    name: "",
    description: "",
    price: "",
    ubication: "",
    images: [],
    company_id: "",
  });

  const [userCompanies, setUserCompanies] = useState([]);

  const handleChange = (address) => {
    setAddress(address); // Actualiza el estado del valor del lugar
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setTourData({ ...tourData, images: files });
  };

  const handleCompanyChange = (event) => {
    const selectedCompanyId = event.target.value;
    setTourData({ ...tourData, company_id: selectedCompanyId });
  };

 const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      console.log("Geocode results:", results);
  
      if (results && results.length > 0) {
        const selectedAddress = results[0].formatted_address;
        console.log("Selected address:", selectedAddress);
        setTourData({ ...tourData, ubication: selectedAddress }); // Actualiza el estado de la ubicación con la dirección completa
      } else {
        console.error("No se pudo encontrar la dirección completa en la dirección proporcionada.");
      }
    } catch (error) {
      console.error("Error al obtener la dirección completa:", error);
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("tour[name]", tourData.name);
    formData.append("tour[description]", tourData.description);
    formData.append("tour[price]", tourData.price);
    formData.append("tour[ubication]", tourData.ubication);
    formData.append("tour[company_id]", tourData.company_id);
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
      window.location.reload(); 
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
              "Content-Type": "application/json",
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
  }, [userId]);
  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      {isLoggedIn && (
        <Modal isOpen={isOpen} toggle={toggleModal} style={modalStyles}>
          <ModalHeader toggle={toggleModal}>Tour Form</ModalHeader>
          <form className="tour-form" onSubmit={handleSubmit}>
            <ModalBody>
              <FormGroup>
                <Label>
                  Name:
                  <Input
                    type="text"
                    name="name"
                    value={tourData.name}
                    onChange={handleInputChange}
                  />
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  Description:
                  <Input
                    type="text"
                    name="description"
                    value={tourData.description}
                    onChange={handleInputChange}
                  />
                </Label>
              </FormGroup>
              <FormGroup>
                <Label for="ubication">Ubication:</Label>
                <PlacesAutocomplete
                  value={address}
                  onChange={handleChange}
                  onSelect={(newAddress) => {
                    handleSelect(newAddress);
                  }}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div id="ubication">
                      <input
                        {...getInputProps({
                          placeholder: "Search Places ...",
                          className: "location-search-input",
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion, index) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          const style = suggestion.active
                            ? { backgroundColor: "#fafafa", cursor: "pointer" }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <div
                              key={index}
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
              </FormGroup>
              <FormGroup>
                <Label>
                  Price:
                  <Input
                    type="number"
                    name="price"
                    value={tourData.price}
                    onChange={handleInputChange}
                  />
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  Images:
                  <Input type="file" multiple onChange={handleImageChange} />
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  Company:
                  <select
                    value={tourData.company_id}
                    onChange={handleCompanyChange}
                  >
                    <option value="">Select a company</option>
                    {userCompanies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </Label>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Create Tour
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
      ;
    </>
  );
};

export default NewTourForm;
