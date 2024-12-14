import { useTheatres } from '../hooks/useTheatres';
import { fetchTheatres } from '../api/theatreAPI';
import { Link } from 'react-router-dom';

export default function Home() {
  const { data, error, loading } = useTheatres(fetchTheatres);

  return (
    <div>
      {loading && <p>Chargement des données...</p>}
      {error ? (
        <p className="text-red-500">Erreur : {error}</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {data.map((theatre) => (
          <ul key={theatre.id} className="border border-gray-600 p-4">
            <li>Nom: {theatre.name}</li>
            <li>Addresse: {theatre.address}</li>
            <li><Link to={`/spectacle/${theatre.borough}`} className="underline">Arrondissement: {theatre.borough}</Link></li>
          </ul>
          ))}
        </div>
      )}
    </div>
  );
}
