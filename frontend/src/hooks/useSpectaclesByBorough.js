import { useState, useEffect } from 'react';

export function useSpectaclesByBorough(fetchAPI, borough) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function getSpectacles() {
    fetchAPI(borough)
      .then((spectacles) => {
        setData(spectacles);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (borough) {
      getSpectacles();
    }
  }, [fetchAPI, borough]);

  return { data, error, loading };
}
