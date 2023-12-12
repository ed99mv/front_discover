import React, { useState, useEffect } from 'react';

const FlashCreateCompany = ({ isVisible, onClose }) => {
  const [isVisibleState, setIsVisibleState] = useState(isVisible);

  useEffect(() => {
    // Actualizar el estado cuando la propiedad isVisible cambia
    setIsVisibleState(isVisible);

    // Si isVisible está establecido en true, ocultar el mensaje después de 3000 milisegundos (3 segundos)
    if (isVisible) {
      const timeout = setTimeout(() => {
        onClose();
      }, 3000);

      // Limpiar el temporizador al desmontar el componente
      return () => clearTimeout(timeout);
    }
  }, [isVisible, onClose]);

  // Renderizar el componente solo si isVisibleState es true
  return isVisibleState ? (
    <div className="flash-message">
      <p>La compañía se creó correctamente.</p>
    </div>
  ) : null;
};

export default FlashCreateCompany;