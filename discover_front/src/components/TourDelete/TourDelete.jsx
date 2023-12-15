import React, { useState, useEffect } from "react";
import "./TourDelete.css";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext";
import { useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Swal from "sweetalert2";

function TourDelete() {
  const { id } = useParams();
  const { authToken, userId } = useContext(AuthContext);
  const [hasPermission, setHasPermission] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUserPermission = async () => {
      try {
        const userCompaniesWithToursResponse = await fetch(
          `http://localhost:3001/api/v1/tours/${userId}/user_companies_with_tours`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
    
        if (userCompaniesWithToursResponse.ok) {
          const responseData = await userCompaniesWithToursResponse.json();
          const userCompaniesWithTours = responseData.userCompaniesWithTours;
          console.log('userCompaniesWithTours:', userCompaniesWithTours);
    
          if (Array.isArray(userCompaniesWithTours)) {
            // Verificar si alguna de las compañías del usuario contiene el tour
            const hasPermission = userCompaniesWithTours.some(company =>
              company.tours.some(userTour => userTour.id === parseInt(id))
            );
              
            console.log(hasPermission);
            setHasPermission(hasPermission);
          } else {
            console.error("userCompaniesWithTours no es un array");
          }
        }
      } catch (error) {
        console.error("Error al verificar el permiso:", error);
      }
    };

    checkUserPermission();
  }, [authToken, id, userId]);

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen(!isConfirmationModalOpen);
  };

  const handleDelete = async () => {
    // Cerrar el modal de confirmación
    toggleConfirmationModal();

    // Realizar la eliminación solo si el usuario tiene permiso
    if (hasPermission) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/v1/tours/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          console.log("Tour eliminado correctamente");

          Swal.fire({
            position: "center", // Use 'center' instead of 'top-end'
            icon: "success",
            title: "Tour eliminado",
            showConfirmButton: false,
            timer: 1000,
            customClass: {
              // Add a custom class for centering
              popup: "center-alert-popup",
            },
          });

        // Navegar a la página actual para recargar
        setTimeout(() => {
          // Navegar a la página actual para recargar
          navigate(`/tours/${id}`, { replace: true });
        }, 1500);
      } else {
        console.error("Error al eliminar el tour");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud DELETE:", error);
      }
    }
  };

  return hasPermission ? (
    <>
      <button onClick={toggleConfirmationModal}>Eliminar Tour</button>
      <Modal isOpen={isConfirmationModalOpen} toggle={toggleConfirmationModal}>
        <ModalHeader toggle={toggleConfirmationModal}>
          Confirmar Eliminación
        </ModalHeader>
        <ModalBody>
          <p className="confirmar">¿Seguro que quieres eliminar este tour?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>
            Sí, eliminar
          </Button>
          <Button color="secondary" onClick={toggleConfirmationModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  ) : null;
}

export default TourDelete;