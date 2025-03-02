import { useEffect, useState } from "react";
import "./LukeCard.scss";

export default function LukeCard() {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [eyeColor, setEyeColor] = useState("");

  useEffect(() => {
    const url = "https://swapi.dev/api/people/1";
    let ignore = false;

    const fetchData = async () => {
      const result = await fetch(url);
      const data = await result.json();
      if (!ignore) {
        setName(data.name);
        setHeight(data.height);
        setEyeColor(data.eye_color);
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="LukeCard">
      <h2>Star Wars API - People</h2>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <p>Name: {name}</p>
          <p>height: {height} cm</p>
          <p>Eye color: {eyeColor}</p>
        </>
      )}
    </div>
  );
}
