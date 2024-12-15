import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSpectacleDetails } from '../api/theatreAPI';  

const SpectacleDetail = () => {
  const { id } = useParams();
  const [spectacle, setSpectacle] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchSpectacleDetails(id); 
        setSpectacle(data[0]);
      } catch (err) {
        console.error('Erreur lors de la récupération des détails');
      } 
    };

    fetchDetails();
  }, [id]); 

  if (!spectacle) {
    return <p>Aucun spectacle trouvé.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-5 bg-[#FCE7F3] rounded-lg" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
      <div className="flex items-center justify-between mb-8">
        <div className="text-container w-1/2">
          <h1 className="text-5xl font-bold text-gray-800 mb-8">{spectacle.spectacle_title}</h1>
          <p className="text-lg text-gray-700 mb-8">{spectacle.synopsis}</p>
          <p className="text-lg text-gray-700">Durée: {spectacle.duration} minutes</p>
          <p className="text-lg text-gray-700">Prix: {spectacle.price} €</p>
          <p className="text-lg text-gray-700">Langue: {spectacle.language}</p>
          <p className="text-lg text-gray-700">Catégorie: {spectacle.category_name}</p>
          <p className="text-lg text-gray-700">Distribution: {spectacle.cast_details}</p>
        </div>
      </div>
    </div>
  );
};

export default SpectacleDetail;
