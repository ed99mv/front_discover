import React, { useState, useEffect, useContext } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Swal from "sweetalert2";
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
import { AuthContext } from "../../authContext";

const NewTourForm = ({ isOpen, toggleModal }) => {
  const { isLoggedIn, authToken, userId } = useContext(AuthContext);
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
    setAddress(address);
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

      if (results && results.length > 0) {
        const selectedAddress = results[0].formatted_address;
        setTourData({ ...tourData, ubication: selectedAddress });
      } else {
        console.error(
          "No se pudo encontrar la dirección completa en la dirección proporcionada."
        );
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
      toggleModal(); // Cerrar el formulario antes de realizar la petición

      const response = await fetch("http://localhost:3001/api/v1/tours", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al crear el tour");
      }

      const createdTour = await response.json();
      console.log("Tour creado:", createdTour);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tour creado exitosamente",
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "center-alert-popup",
        },
      }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    } catch (error) {
      console.error("Error al crear el tour:", error);
    }
  };

  useEffect(() => {
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
  }, [userId, authToken]);

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
          <ModalHeader toggle={toggleModal}>Formulario de creación de nuevo Tour</ModalHeader>
          <form className="tour-form" onSubmit={handleSubmit}>
            <ModalBody>
              <FormGroup>
                <Label>
                  Nombre del tour:
                  <Input
                  placeholder="ejm: Isla Mujeres"
                    type="text"
                    name="name"
                    value={tourData.name}
                    onChange={handleInputChange}
                  />
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  Descripción del tour:
                  <Input
                    type="text"
                    name="description"
                    value={tourData.description}
                    onChange={handleInputChange}
                  />
                </Label>
              </FormGroup>
              <FormGroup>
                <Label for="ubication">Ubicación:</Label>
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
                          placeholder: "Buscar lugar ...",
                          className: "location-search-input",
                        })}
                      />
                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Cargando...</div>}
                        {suggestions.map((suggestion, index) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          const style = suggestion.active
                            ? {
                                backgroundColor: "#fafafa",
                                cursor: "pointer",
                              }
                            : {
                                backgroundColor: "#ffffff",
                                cursor: "pointer",
                              };
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
                  Precio:
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
                  Añadir:
                  <Input type="file" multiple onChange={handleImageChange} />
                </Label>
              </FormGroup>
              <FormGroup>
                <Label>
                  Compañía: 
                  <br />
                  <select
                    value={tourData.company_id}
                    onChange={handleCompanyChange}
                  >
                    <option value="">Selecciona una compañía</option>
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
                Crear Tour
              </Button>
              <Button color="secondary" onClick={toggleModal}>
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </Modal>
      )}
    </>
  );
};

export default NewTourForm;