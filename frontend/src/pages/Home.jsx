import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/spectacles')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <ul>
      {data.map(spectacle => (
        <li key={spectacle.id} className="p-5 m-5 border-2 max-w-sm">
          <p className="text-xl">{spectacle.title}</p>
          <p>{spectacle.synopsis}</p>
          <p>Durée: {spectacle.duration}</p>
          <p>Prix: {spectacle.price} €</p>
        </li>
      ))}
    </ul>
  );
}
