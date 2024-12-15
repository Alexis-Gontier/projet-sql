import { useState } from 'react';
import { useTheatres } from '../hooks/useTheatres';
import { fetchTheatres } from '../api/theatreAPI';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const { data, error, loading } = useTheatres(fetchTheatres);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  // liste des catégories dans le menu
  const categories = ['Comedie', 'Drame', 'Musical', 'Enfant'];

  // redirect
  const handleNavigate = () => {
    if (selectedCategory) {
      navigate(`/spectacles-en-cours/${selectedCategory}`);
    } else {
      alert('Veuillez choisir une catégorie.');
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Bienvenue sur le site des spectacles</h1>

      {/* menu pour sélectionner une cat */}
      <div className="mb-6">
        <label htmlFor="category-select" className="block mb-2 font-medium">
          Choisissez une catégorie :
        </label>
        <div className="flex items-center gap-4">
          <select
            id="category-select"
            className="border border-gray-400 rounded p-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Sélectionnez une catégorie --</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-400"
            onClick={handleNavigate}
          >
            Voir les spectacles
          </button>
        </div>
      </div>

      {/* Affichage des données des théâtres */}
      {loading && <p>Chargement des données...</p>}
      {error ? (
        <p className="text-red-500">Erreur : {error}</p>
      ) : (
        <>
          {data.map((theatre) => (
            <ul key={theatre.id} className="border border-gray-600 p-4 flex flex-col gap-2 my-4">
              <li>Nom: {theatre.name}</li>
              <li>Addresse: {theatre.address}</li>
              <li className="flex gap-2">
                <p>Arrondissement: {theatre.borough}</p>
                <Link to={`/spectacles/${theatre.borough}`} className="underline">
                  spectacles
                </Link>
                <Link to={`/salles/${theatre.borough}`} className="underline">
                  salles
                </Link>
              </li>
            </ul>
          ))}
        </>
      )}
    </div>
  );
}
