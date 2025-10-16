import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${id}`)
      .then((res) => res.json())
      .then((data) => setPerson(data.result.properties))
      .catch((err) => console.error(err));
  }, [id]);

  if (!person) return <p className="text-center text-light mt-5">Loading...</p>;

  return (
    <div className="container text-light mt-5">
      <h2 className="text-warning">{person.name}</h2>
      <p>Height: {person.height}</p>
      <p>Mass: {person.mass}</p>
      <p>Gender: {person.gender}</p>
      <p>Birth year: {person.birth_year}</p>
      <Link to="/people" className="btn btn-outline-warning mt-3">Back</Link>
    </div>
  );
};

export default PersonDetail;
