import { useParams } from 'react-router-dom';
import { useSpectaclesByBorough } from '../hooks/useSpectaclesByBorough';
import { fetchSallesByBorough } from '../api/theatreAPI';

export default function SalleBorough() {
  const { borough } = useParams();

  const { data, error, loading } = useSpectaclesByBorough(fetchSallesByBorough, borough);

  return (
    <div>
      <h1>Borough: {borough}</h1>

      {loading && <p>Chargement des spectacles...</p>}
      {error && <p className="text-red-500">Erreur: {error}</p>}

      <>
        <h2>2. Afficher les salles par arrondissement</h2>
        {data && data.length > 0 ? (
          data.map((spectacle) => (
            <ul key={spectacle.title} className="border border-gray-600 p-4 flex flex-col gap-2 my-4">
              <li>{spectacle.theatre_name}</li>
              <li>{spectacle.room_name}</li>
            </ul>
          ))
        ) : (
          <p>Aucun spectacle trouvé pour cet arrondissement.</p>
        )}
      </>
    </div>
  );
}
