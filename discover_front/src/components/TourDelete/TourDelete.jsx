import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../authContext";
import { useContext } from "react";

function TourDelete() {
  const { id } = useParams();
  const { authToken, userId } = useContext(AuthContext);
  const [hasPermission, setHasPermission] = useState(false);

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

  const handleDelete = async () => {
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
          window.location.href = "/";
        } else {
          console.error("Error al eliminar el tour");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud DELETE:", error);
      }
    }
  };

  return hasPermission ? (
    <button onClick={handleDelete}>Eliminar Tour</button>
  ) : null;
}

export default TourDelete;
