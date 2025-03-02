import "./App.scss";
import RandomDog from "./components/Dog/Dog";
import LukeCard from "./components/LukeCard/LukeCard";
import PokemonCard from "./components/pokemon/pokemon";
import SwCharacterCard from "./components/SWCharacterCard/SWCharacterCard";
import StarShip from "./components/SWstarship/starship";

function App() {
  return (
    <>
      <h1>rocket</h1>
      <p>a demo of useEffect</p>
      <LukeCard />
      <SwCharacterCard characterID={5} />
      <PokemonCard pokemonId={1} />
      <StarShip starshipID={10} />
      <RandomDog />
    </>
  );
}

export default App;
