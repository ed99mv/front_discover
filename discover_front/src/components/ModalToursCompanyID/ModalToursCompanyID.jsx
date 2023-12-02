import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TourCard from "../tourCard/TourCard";
import Modal from "react-modal";
import './ModalToursCompany.css';

function ModalToursCompanyID() {
    const { id } = useParams();
    const [associatedTours, setAssociatedTours] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                // Obtener los tours asociados a esta compañía
                const associatedToursResponse = await fetch(
                    `http://localhost:3001/api/v1/companies/${id}/associated_tours`
                );
                if (!associatedToursResponse.ok) {
                    throw new Error("Failed to fetch associated tours.");
                }
                const associatedToursData = await associatedToursResponse.json();
                setAssociatedTours(associatedToursData);
            } catch (error) {
                console.error("Error fetching tour details:", error);
            }
        };
        fetchCompanyDetails();
    }, [id]);

    const customStyles = {
        content: {
            position: 'absolute', 

        }
    };

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>Tours de la agencia</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Tours asociados"
                style={customStyles}
            >
                <div className="associated-tours">
                    <h2>Tours asociados</h2>
                    <div className="gallery-container">
                        {associatedTours && associatedTours.length > 0 ? (
                            <div className="gallery-container">
                                {associatedTours.map((tour) => (
                                    <TourCard key={tour.id} tour={tour} />
                                ))}
                            </div>
                        ) : (
                            <p>No hay tours asociados disponibles.</p>
                        )}
                    </div>
                </div>
                <button onClick={() => setModalIsOpen(false)}>Cerrar Modal</button>
            </Modal>
        </div>
    );
}

export default ModalToursCompanyID;
