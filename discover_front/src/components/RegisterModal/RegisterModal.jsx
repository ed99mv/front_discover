import React, { Component } from "react";
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
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Swal from "sweetalert2";

class RegisterModal extends Component {
  state = {
    full_name: "",
    email: "",
    phone_number: "",
    country: "",
    password: "",
    confirmPassword: "",
  };
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleInputChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handlePhoneChange = (value) => {
    this.setState({ phone_number: value });
  };

  handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      console.log("Geocode results:", results);

      const addressComponents = results[0].address_components;
      console.log("Address components:", addressComponents);

      const countryComponent = addressComponents.find((component) =>
        component.types.includes("country")
      );

      if (countryComponent) {
        const selectedCountry = countryComponent.long_name;
        console.log("Selected country:", selectedCountry);
        this.setState({ country: selectedCountry });
      } else {
        console.error(
          "No se pudo encontrar el país en la dirección proporcionada."
        );
      }
    } catch (error) {
      console.error("Error al obtener el país:", error);
    }
  };

  handleRegister = () => {
    const {
      full_name,
      email,
      phone_number,
      country,
      password,
      confirmPassword,
    } = this.state;
    console.log(
      "Valor de country antes de enviar la solicitud:",
      this.state.country
    );

    // Verifica si las contraseñas coinciden
    if (password !== confirmPassword || !country || !country.trim()) {
      console.error("Las contraseñas no coinciden");
      return;
    }

    // Construye el objeto de datos a enviar al backend
    const data = {
      user: {
        full_name,
        email,
        phone_number,
        country,
        password,
        password_confirmation: confirmPassword,
        // Otros campos según tus necesidades
      },
    };

    fetch("http://localhost:3001/signup", {
      // Ajusta la URL según tu configuración
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((result) => {
        console.log("Registro exitoso:", result);

        Swal.fire({
          position: "center", // Use 'center' instead of 'top-end'
          icon: "success",
          title: "Registro exitoso",
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            // Add a custom class for centering
            popup: "center-alert-popup",
          },
        });

        // Cierra el modal después de registrar
        this.props.toggle();
      })
      .catch((error) => {
        console.error("Error en el registro:", error);
        // Manejo de errores, si es necesario
      });
  };

  render() {
    const { isOpen, toggle } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Registro de Usuario</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="full_name">Nombre Completo</Label>
            <Input
              type="text"
              id="full_name"
              value={this.state.full_name}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone_number">Número de Teléfono</Label>
            <PhoneInput
              international
              defaultCountry="CR"
              id="phone_number"
              value={this.state.phone_number}
              onChange={this.handlePhoneChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="country">País</Label>
            <PlacesAutocomplete
              value={this.state.address}
              onChange={this.handleChange}
              onSelect={(address) => {
                console.log("Selected address:", address);
                this.handleSelect(address);
              }}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div id="country">
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "location-search-input",
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
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
            <Label for="password">Contraseña</Label>
            <Input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirmar Contraseña</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleInputChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleRegister}>
            Registrarme
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default RegisterModal;
