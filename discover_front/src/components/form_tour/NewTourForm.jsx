import React, { useState, useEffect } from 'react';

const NewTourForm = () => {
  const [tourData, setTourData] = useState({
    name: '',
    description: '',
    price: 0,
    gallery_ids: [],
  });

  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch('http://localhost3001/api/v1/galleries');
        if (!response.ok) {
          throw new Error('Error al obtener las galerías');
        }
        const galleriesData = await response.json();
        setGalleries(galleriesData);
      } catch (error) {
        console.error('Error fetching galleries:', error);
      }
    };

    fetchGalleries();
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleCheckboxChange = event => {
    const { checked, value } = event.target;
    let updatedGalleryIds = [...tourData.gallery_ids];
    if (checked) {
      updatedGalleryIds.push(Number(value));
    } else {
      updatedGalleryIds = updatedGalleryIds.filter(id => id !== Number(value));
    }
    setTourData({ ...tourData, gallery_ids: updatedGalleryIds });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost3001/api/v1/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tour: tourData }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el tour');
      }

      const responseData = await response.json();
      console.log('Tour creado exitosamente:', responseData);
      // Aquí podrías redirigir a otra página o manejar la respuesta de otra manera

    } catch (error) {
      console.error('Error al crear el tour:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={tourData.name} onChange={handleInputChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={tourData.description} onChange={handleInputChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={tourData.price} onChange={handleInputChange} />
      </label>
      {galleries.map(gallery => (
        <div key={gallery.id}>
          <input
            type="checkbox"
            name="gallery_ids"
            value={gallery.id}
            onChange={handleCheckboxChange}
          />
          <span>{gallery.photo_path}</span> {/* Asegúrate de mostrar la imagen */}
        </div>
      ))}
      <button type="submit">Crear Tour</button>
    </form>
  );
};

export default NewTourForm;
