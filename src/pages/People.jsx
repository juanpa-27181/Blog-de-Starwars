import { useEffect, useState } from "react";
import CardItem from "../components/CardItem";

const People = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people/")
      .then((res) => res.json())
      .then((data) => setPeople(data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-danger mb-4">Characters</h2>
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {people.map((p) => (
          <CardItem key={p.uid} item={p} type="characters" />
        ))}
      </div>
    </div>
  );
};

export default People;
