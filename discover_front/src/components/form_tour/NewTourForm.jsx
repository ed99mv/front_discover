import React, { useState } from 'react';
import './NewTourForm.css';

const NewTourForm = () => {
  const [tourData, setTourData] = useState({
    name: '',
    description: '',
    price: '',
    ubication: '', // Agregar ubication al estado
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleImageChange = event => {
    const files = Array.from(event.target.files);
    setSelectedImages(files);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const tourResponse = await fetch('http://localhost:3001/api/v1/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tourData),
      });

      if (!tourResponse.ok) {
        throw new Error('Error al crear el tour');
      }

      const createdTour = await tourResponse.json();

      const imagesFormData = new FormData();

    selectedImages.forEach(image => {
      imagesFormData.append('gallery[photo_data]', image); // Cambio aquí: quita los corchetes y los corchetes vacíos []
    });

      const imageResponse = await fetch(`http://localhost:3001/api/v1/tours/${createdTour.id}/galleries`, {
        method: 'POST',
        body: imagesFormData,
      });

      if (!imageResponse.ok) {
        throw new Error('Error al asociar las imágenes con el tour');
      }

      const imageData = await imageResponse.json();
      console.log('Imágenes asociadas al tour:', imageData);
      // Puedes redirigir a otra página o manejar la respuesta de otra manera

    } catch (error) {
      console.error('Error al crear el tour o asociar las imágenes:', error);
    }
  };

  return (
    <form className="tour-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={tourData.name} onChange={handleInputChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={tourData.description} onChange={handleInputChange} />
      </label>
      <label>
        Ubication:
        <textarea name="ubication" value={tourData.ubication} onChange={handleInputChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={tourData.price} onChange={handleInputChange} />
      </label>
      <label>
        Images:
        <input type="file" multiple onChange={handleImageChange} />
      </label>
      <button type="submit">Crear Tour</button>
    </form>
  );
};

export default NewTourForm;
