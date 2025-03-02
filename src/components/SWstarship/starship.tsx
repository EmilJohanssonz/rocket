import { useEffect, useState } from "react";



interface SWStarships {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: any[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface SWStarshipProps {
  starshipID: number;
}

export default function StarShip ({starshipID}:SWStarshipProps) {
  const [loading, setLoading] = useState(true);
  const [ship, setShips] = useState<SWStarships | null>(null);

  useEffect(() => {
    const url = `https://swapi.dev/api/starships/${starshipID}`;
    let ignore = false;


    const fetchData = async () => {
      try {
        const result = await fetch(url);
        const data:SWStarships = await result.json();
        if (!ignore) {
          setShips(data);
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetch data", error);
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [starshipID]);

  return (
    <div>
      <h2>Star wars ships</h2>
      {loading ? (
        <p>loading...</p>
      ):ship ? (
        <>
        <p>Name: {ship.name}</p>
        <p>Model: {ship.model}</p>
        </>
      ) : (
        <p>Error</p>
      )}
    </div>
  )
}