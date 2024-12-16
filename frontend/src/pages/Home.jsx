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

  // Charge les données pour les catégories avec le nombre de spectacles
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

  // Redirec
  const handleNavigate = () => {
    if (selectedCategory) {
      navigate(`/spectacles-en-cours/${selectedCategory}`);
    } else {
      alert('Veuillez choisir une catégorie.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-5 bg-[#FCE7F3] rounded-lg" style={{ fontFamily: 'Libre Caslon Text, serif' }}>
    <div className="flex items-center justify-between mb-8">
      <div className="text-container w-1/2">
        <h1 className="text-9xl font-bold text-gray-800 mb-8">
          Discover, 
        </h1> 
        <h1 className="text-9xl font-bold text-gray-800 mb-8">
          Enjoy 
        </h1> 
        <h1 className="text-9xl font-bold text-gray-800 mb-8"> 
          ART 
        </h1>
        <p>Expenses as material breeding insisted building to in. Continual so distrusts pronounce by unwilling listening. Thing do taste on we manor. Him had wound use found hoped. Of distrusts immediate enjoyment curiosity do. Marianne saw thoughts the humoured.</p>
      </div>

      <div className="image-container w-1/2 m-5">
        <img 
          src="https://s3-alpha-sig.figma.com/img/28ff/1929/cb3b13936b2da8bffa66f033de941e8e?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gKdsk-NjZZARtKr0QADYPYwkJfBUkKDuWscDddr3~C2XiEayhrT3R8baqB-QQHYrY9PxiPgZQDH3Xs-FEZgDhgRzaFDWuKHmIaDJI93KVGC1qCnt~qSnZE0x3fXDohJmxthA~~XArXs9G5thv7lSPvr5OkjLe-86Es-2Of6dzCEhl28u5VXqlxYSVzXNTe-tW~8rDCD9kYvHqCipmFIBfghccDwyvME1x0XZoUNFUqN8-E7fcR13~HjTi02bR5twxPQfIp81DFbWU5KRXRr3PEe32nPaaJ9qBQmIt8VZpddEH0Zhuvp938XS~n-dNiuWZsUzQt4C0LybKhd~oNPe9w__" 
          alt="Illustration" 
          className="w-full rounded-lg shadow-md mb-6" 
        />
      </div>
    </div>



    {/* Menu pour sélectionner une catégorie */}
    <div className="m-8">
      <label
        htmlFor="category-select"
        className="block text-lg font-medium text-gray-700 mb-5"
      >
        Choisissez une catégorie :
      </label>
      <div className="flex items-center gap-4">
        <select
          id="category-select"
          className="border border-gray-400 rounded-md p-2 w-full sm:w-auto bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Sélectionnez une catégorie --</option>
          {loadingCounts && <option>Chargement des catégories...</option>}
          {errorCounts && <option>Erreur de chargement</option>}
          {!loadingCounts &&
            !errorCounts &&
            categoriesWithCounts.map((category) => (
              <option
                key={category.category_name}
                value={category.category_name}
              >
                {category.category_name} ({category.spectacle_count} spectacles)
              </option>
            ))}
        </select>
        <button
          className="bg-[#162D3A] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#0D1E26] focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleNavigate}
        >
          Voir les spectacles
        </button>
      </div>
    </div>

    {/* Affichage des données des théâtres */}
    {loading && <p className="text-center text-gray-500">Chargement des données...</p>}
    {error ? (
      <p className="text-center text-red-600 font-medium">Erreur : {error}</p>
    ) : (
      <>
        {data.map((theatre) => (
          <ul
            key={theatre.id}
            className="border border-gray-300 bg-white rounded-lg p-6 mb-6 shadow-md"
          >
            <li className="text-lg font-medium text-gray-800">Nom: {theatre.name}</li>
            <li className="text-gray-700">Adresse: {theatre.address}</li>
            <li className="flex flex-wrap gap-4 mt-3">
              <p className="text-gray-700">Arrondissement: {theatre.borough}</p>
              <Link
                to={`/spectacles/${theatre.borough}`}
                className="text-blue-600 underline hover:text-blue-800"
              >
                Spectacles
              </Link>
              <Link
                to={`/salles/${theatre.borough}`}
                className="text-blue-600 underline hover:text-blue-800"
              >
                Salles
              </Link>
            </li>
          </ul>
        ))}
      </>
    )}
  </div>
  );
}

