import { useEffect, useState } from "react";

interface Pokemon {
  name: string;
  id: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
}

interface PokemonCardProps {
  pokemonId: number;
}

export default function PokemonCard({ pokemonId }: PokemonCardProps) {
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    let ignore = false;

    const fetchData = async () => {
      try {
        const result = await fetch(url);
        const data: Pokemon = await result.json();
        console.log("Fetched Pokémon data:", data);
        if (!ignore) {
          setPokemon(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, [pokemonId]);

  return (
    <div className="PokemonCard">
      <h2>Pokémon Card</h2>
      {loading ? (
        <p>Loading...</p>
      ) : pokemon ? (
        <>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>
            <strong>Name:</strong> {pokemon.name}
          </p>
          <p>
            <strong>ID:</strong> {pokemon.id}
          </p>
          <p>
            <strong>Height:</strong> {pokemon.height} dm
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight} hg
          </p>
          <p>
            <strong>Type:</strong>{" "}
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </p>
        </>
      ) : (
        <p>Error loading Pokémon data.</p>
      )}
    </div>
  );
}
