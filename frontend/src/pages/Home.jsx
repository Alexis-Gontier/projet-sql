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
        <>
          {data.map((theatre) => (
          <ul key={theatre.id} className="border border-gray-600 p-4 flex flex-col gap-2 my-4">
            <li>Nom: {theatre.name}</li>
            <li>Addresse: {theatre.address}</li>
            <li className="flex gap-2">
              <p>Arrondissement: {theatre.borough}</p>
              <Link to={`/spectacles/${theatre.borough}`} className="underline">spectacles</Link>
              <Link to={`/salles/${theatre.borough}`} className="underline">salles</Link>
            </li>
          </ul>
          ))}
        </>
      )}
    </div>
  );
}
