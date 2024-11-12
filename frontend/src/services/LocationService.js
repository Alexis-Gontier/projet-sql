// api pour recup les coordonees d'une adresse , doc : https://nominatim.org/release-docs/develop/api/Overview/
export async function fetchCoordinates(address) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };
      } else {
        console.error("Adresse inexistante");
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des coordonnées", error);
      return null;
    }
  }
  