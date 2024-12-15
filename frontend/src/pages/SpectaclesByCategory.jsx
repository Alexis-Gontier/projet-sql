import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchSpectaclesByCategory } from '../api/theatreAPI';

export default function SpectaclesByCategory() {
  const { category } = useParams();
  const [spectacles, setSpectacles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSpectacles = async () => {
      try {
        const data = await fetchSpectaclesByCategory(category);
        setSpectacles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSpectacles();
  }, [category]);

  if (loading) return <p>Chargement des spectacles...</p>;
  if (error) return <p className="text-red-500">Erreur : {error}</p>;

  return (
    <div>
      <h1>Spectacles en cours pour la catégorie "{category}"</h1>
      {spectacles.length === 0 ? (
        <p>Aucun spectacle en cours pour cette catégorie.</p>
      ) : (
        <ul>
          {spectacles.map((spectacle, index) => (
            <li key={index} className="border p-2 my-2">
              <h2>{spectacle.title}</h2>
              <p>Catégorie : {spectacle.category_name}</p>
              <p>
                Dates : {new Date(spectacle.first_date).toLocaleDateString()} -{' '}
                {new Date(spectacle.last_date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
