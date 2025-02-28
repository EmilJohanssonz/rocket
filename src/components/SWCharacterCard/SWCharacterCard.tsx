import { useEffect, useState } from "react";

interface SwPeople {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface SwPeopleProps {
  characterID: number;
}

export default function SwCharacterCard({ characterID }: SwPeopleProps) {
  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState<SwPeople | null>(null);

  useEffect(() => {
    const url = `https://swapi.dev/api/people/${characterID}`;
    let ignore = false;

    const fetchData = async () => {
      try {
        const result = await fetch(url);
        const data: SwPeople = await result.json();
        if (!ignore) {
          setCharacter(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data from SWAPI", error);
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, [characterID]);

  return (
    <div className="SWCharacterCard">
      <h2>Star Wars Character</h2>
      {loading ? (
        <p>Loading...</p>
      ) : character ? (
        <>
          <p>
            <strong>Name:</strong> {character.name}
          </p>
          <p>
            <strong>Height:</strong> {character.height} cm
          </p>
          <p>
            <strong>Mass:</strong> {character.mass} kg
          </p>
          <p>
            <strong>Hair color:</strong> {character.hair_color}
          </p>
          <p>
            <strong>Skin color:</strong> {character.skin_color}
          </p>
          <p>
            <strong>Eye color:</strong> {character.eye_color}
          </p>
          <p>
            <strong>Birth year:</strong> {character.birth_year}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
        </>
      ) : (
        <p>Error loading character data.</p>
      )}
    </div>
  );
}
