import { useEffect, useState } from "react";
import CardItem from "../components/CardItem";

const Planets = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets/")
      .then((res) => res.json())
      .then((data) => setPlanets(data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-danger mb-4">Planets</h2>
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {planets.map((p) => (
          <CardItem key={p.uid} item={p} type="planets" />
        ))}
      </div>
    </div>
  );
};

export default Planets;
