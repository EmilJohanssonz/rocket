import { useEffect, useState } from "react";

interface DogImage {
  message: string;
  status: string;
}

export default function RandomDog() {
  const [loading, setLoading] = useState(true);
  const [dogImage, setDogImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = "https://dog.ceo/api/breeds/image/random";
    let ignore = false;

    const fetchData = async () => {
      try {
        const result = await fetch(url);
        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        const data: DogImage = await result.json();
        if (!ignore) {
          setDogImage(data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <h2>Random Dog Image</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : dogImage ? (
        <img src={dogImage} alt="Random Dog" style={{ maxWidth: "100%" }} />
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
}
