import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../authContext";
import { useParams } from "react-router-dom";

const CompanyDelete = () => {
  const { authToken, userRole } = useContext(AuthContext);
  const { id } = useParams();

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
        window.location.href = "/companiespage";
        // Agregar aquí lógica adicional si se requiere alguna acción después de eliminar la compañía
      } else {
        console.error("Error al eliminar la compañía");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud DELETE:", error);
    }
  };

  return userRole === "admin" ? <button onClick={handleDelete}>Eliminar Company</button> : null;
};

export default CompanyDelete;
