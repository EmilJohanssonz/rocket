import { useEffect, useState } from "react";

interface SwPlanet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: any[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

interface SwPlanetProps {
  planetID: number;
}

export default function Planet({ planetID }: SwPlanetProps) {
  const [loading, setLoading] = useState(true);
  const [starPlanet, setStarPlanet] = useState<SwPlanet | null>(null);

  useEffect(() => {
    const url = `https://swapi.dev/api/planets/${planetID}/`;
    let ignore = false;

    const fetchData = async () => {
      try {
        const result = await fetch(url);
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        const data: SwPlanet = await result.json();
        if (!ignore) {
          setStarPlanet(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [planetID]);

  return (
    <div>
      <h2>Star Wars Planet</h2>
      {loading ? (
        <p>Loading...</p>
      ) : starPlanet ? (
        <>
          <p>Name: {starPlanet.name}</p>
          <p>Climate: {starPlanet.climate}</p>
          <p>Population: {starPlanet.population}</p>
        </>
      ) : (
        <p>Error</p>
      )}
    </div>
  );
}
