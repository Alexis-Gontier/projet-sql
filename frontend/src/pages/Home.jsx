import { useState, useEffect } from 'react';
import { useTheatres } from '../hooks/useTheatres';
import { fetchTheatres, fetchSpectacleCounts } from '../api/theatreAPI';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const { data, error, loading } = useTheatres(fetchTheatres);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoriesWithCounts, setCategoriesWithCounts] = useState([]);
  const [loadingCounts, setLoadingCounts] = useState(true);
  const [errorCounts, setErrorCounts] = useState(null);
  const navigate = useNavigate();

  // Charger les données pour les catégories avec le nombre de spectacles
  useEffect(() => {
    const loadSpectacleCounts = async () => {
      try {
        const counts = await fetchSpectacleCounts();
        setCategoriesWithCounts(counts);
      } catch (err) {
        setErrorCounts(err.message);
      } finally {
        setLoadingCounts(false);
      }
    };

    loadSpectacleCounts();
  }, []);

  // Redirection vers la page des spectacles pour la catégorie sélectionnée
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

      {/* Menu pour sélectionner une catégorie */}
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
            {loadingCounts && <option>Chargement des catégories...</option>}
            {errorCounts && <option>Erreur de chargement</option>}
            {!loadingCounts &&
              !errorCounts &&
              categoriesWithCounts.map((category) => (
                <option key={category.category_name} value={category.category_name}>
                  {category.category_name} ({category.spectacle_count} spectacles)
                </option>
              ))}
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
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
              <li>Adresse: {theatre.address}</li>
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
