import "./App.scss";
import LukeCard from "./components/LukeCard/LukeCard";
import PokemonCard from "./components/pokemon/pokemon";
import SwCharacterCard from "./components/SWCharacterCard/SWCharacterCard";

function App() {

  return (
    <>
      <h1>rocket</h1>
      <p>a demo of useEffect</p>
      <LukeCard />
      <SwCharacterCard characterID={6} />
      <SwCharacterCard characterID={5} />
      <PokemonCard pokemonId={1} />
   
    </>
  );
}

export default App;
