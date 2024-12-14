import { useState, useEffect } from 'react';

export function useTheatres(fetchAPI) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function getTheatres() {
    fetchAPI()
      .then((theatres) => {
        setData(theatres);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(function () {
    getTheatres();
  }, [fetchAPI]);

  return { data, error, loading };
}
