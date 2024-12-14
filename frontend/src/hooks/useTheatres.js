import { useState, useEffect } from 'react';
import { fetchTheatres } from '../api/theatreAPI';

export const useTheatres = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTheatres = async () => {
      try {
        const theatres = await fetchTheatres();
        setData(theatres);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getTheatres();
  }, []);

  return { data, error, loading };
};
