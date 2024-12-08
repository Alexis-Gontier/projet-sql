import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/theatres')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <ul>
      {data.map(theatres => (
        <li key={theatres.id} className="p-5 m-5 border-2 max-w-sm">
          <p className="text-xl">{theatres.name}</p>
          <p>{theatres.presentation}</p>
          <p>Adresse: {theatres.address}</p>
        </li>
      ))}
    </ul>
  );
}
