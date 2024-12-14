import { useParams } from 'react-router-dom';
import { useSpectaclesByBorough } from '../hooks/useSpectaclesByBorough';
import { fetchSpectaclesByBorough } from '../api/theatreAPI';

export default function SpectaclesBorough() {
  const { borough } = useParams();

  const { data, error, loading } = useSpectaclesByBorough(fetchSpectaclesByBorough, borough);

  return (
    <div>
      <h1>Borough: {borough}</h1>

      {loading && <p>Chargement des spectacles...</p>}
      {error && <p className="text-red-500">Erreur: {error}</p>}

      <>
        <h2>2. Afficher les spectacles par arrondissement</h2>
        {data && data.length > 0 ? (
          data.map((spectacle) => (
            <ul className="border border-gray-600 p-4 flex flex-col gap-2 my-4">
              <li key={spectacle.title}>{spectacle.title}</li>
            </ul>
          ))
        ) : (
          <p>Aucun spectacle trouvé pour cet arrondissement.</p>
        )}
      </>
    </div>
  );
}
