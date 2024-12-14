import { useTheatres } from '../hooks/useTheatres';
import { fetchTheatres } from '../api/theatreAPI';

export default function Home() {
  const { data, error, loading } = useTheatres(fetchTheatres);

  return (
    <div>
      {loading && <p>Chargement des données...</p>}
      {error ? (
        <p className="text-red-500">Erreur : {error}</p>
      ) : (
        <ul>
          {data.map((theatre) => (
            <li key={theatre.id}>{theatre.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
