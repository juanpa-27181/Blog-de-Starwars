import { useEffect, useState } from "react";
import CardItem from "../components/CardItem";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/vehicles/")
      .then((res) => res.json())
      .then((data) => setVehicles(data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-danger mb-4">Vehicles</h2>
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {vehicles.map((v) => (
          <CardItem key={v.uid} item={v} type="vehicles" />
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
