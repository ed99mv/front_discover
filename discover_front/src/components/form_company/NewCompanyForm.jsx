import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../authContext";
import FlashCreateCompany from "../messages/flashCreateCompany/FlashCreateCompany";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
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

const NewCompanyForm = ({ isOpen, toggleModalCompany }) => {
  //  const [companyCreated, setCompanyCreated] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { authToken, userId } = useContext(AuthContext);
  const [address, setAddress] = useState("");
  const [companyData, setCompanyData] = useState({
    name: "",
    description: "",
    ubication: "",
    images: [],
  });

  // const toggleModal = () => {
  //   setIsOpen(!isOpen); // Cambia el estado isOpen al valor opuesto
  // };

  const handleChangeAddress = (address) => {
    setAddress(address);
  };

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

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      console.log("Geocode results:", results);

      if (results && results.length > 0) {
        const selectedAddress = results[0].formatted_address;
        console.log("Selected address:", selectedAddress);
        setCompanyData({ ...companyData, ubication: selectedAddress }); // Actualiza el estado de la ubicación con la dirección completa
      } else {
        console.error(
          "No se pudo encontrar la dirección completa en la dirección proporcionada."
        );
      }
    } catch (error) {
      console.error("Error al obtener la dirección completa:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("company[name]", companyData.name);
      formData.append("company[description]", companyData.description);
      formData.append("company[ubication]", companyData.ubication);
      //   formData.append("company[user_id]", userId)
      companyData.images.forEach((image) => {
        formData.append(`company[images][]`, image);
      });

      const response = await fetch("http://localhost:3001/api/v1/companies", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${authToken}`, // Agregar el token de autenticación JWT
        },
      });

      if (response.ok) {
        setCompanyData({
          name: "",
          description: "",
          ubication: "",
          images: [],
        });
        // setCompanyCreated(true);
        toggleModalCompany();
        window.location.reload(); 
      } else {
        console.log("no se pudo crear la compañía");
      }
    } catch (error) {
      console.error(`Error creating company: ${error.message}`);
    }
  };
  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      {isLoggedIn && (
      <>
       {/* <FlashCreateCompany isVisible={companyCreated} onClose={() => setCompanyCreated(false)} /> Muestra el mensaje FlashCreateCompany */}
        <Modal isOpen={isOpen} style={modalStyles}>
          <ModalHeader>Company Form</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <FormGroup>
                <Label>
                  Name:
                  <Input
                    type="text"
                    name="name"
                    value={companyData.name}
                    onChange={handleChange}
                  />
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  Descripción:
                  <Input
                    type="text"
                    name="description"
                    value={companyData.description}
                    onChange={handleChange}
                  />
                </Label>
              </FormGroup>
              <FormGroup>
                <Label for="ubication">Ubication:</Label>
                <PlacesAutocomplete
                  value={address}
                  onChange={handleChangeAddress}
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
                  Images:
                  <Input type="file" multiple onChange={handleImageChange} />
                </Label>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type="submit">Create Company</Button>
              <Button color="secondary" onClick={toggleModalCompany}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </Modal>
        </>
      )}
    </>
  );
};

export default NewCompanyForm;
