import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../authContext";
import { useParams } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CompanyDelete = () => {
  const { authToken, userRole } = useContext(AuthContext);
  const { id } = useParams();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen(!isConfirmationModalOpen);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/companies/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Compañía eliminada correctamente");
        // window.location.href = "/companiespage";
      } else {
        console.error("Error al eliminar la compañía");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud DELETE:", error);
    }
    setIsConfirmationModalOpen(false); // Cerrar el modal después de eliminar la compañía
  };

  return (
    <>
      {userRole === "admin" && (
        <>
          <button onClick={toggleConfirmationModal}>Eliminar Company</button>
          <Modal
            isOpen={isConfirmationModalOpen}
            toggle={toggleConfirmationModal}
          >
            <ModalHeader toggle={toggleConfirmationModal}>
              Confirmar Eliminación
            </ModalHeader>
            <ModalBody>
              <p className="confirmar">
                ¿Seguro que quieres eliminar esta compañía?
              </p>
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
      )}
    </>
  );
};

export default CompanyDelete;
