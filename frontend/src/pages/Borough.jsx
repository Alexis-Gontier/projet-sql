import { useParams } from 'react-router-dom';
import { useSpectaclesByBorough } from '../hooks/useSpectaclesByBorough';
import { fetchSpectaclesByBorough } from '../api/theatreAPI';

export default function Borough() {
  const { borough } = useParams();

  const { data, error, loading } = useSpectaclesByBorough(fetchSpectaclesByBorough, borough);

  return (
    <div>
      <h1>Borough: {borough}</h1>

      {loading && <p>Chargement des spectacles...</p>}
      {error && <p className="text-red-500">Erreur: {error}</p>}

      <ul>
        {data && data.length > 0 ? (
          data.map((spectacle) => (
            <li key={spectacle.title}>{spectacle.title}</li>
          ))
        ) : (
          <p>Aucun spectacle trouvé pour cet arrondissement.</p>
        )}
      </ul>
    </div>
  );
}
