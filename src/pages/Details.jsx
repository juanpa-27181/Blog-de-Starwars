import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { type, id } = useParams(); // Ejemplo: /people/1 o /vehicles/2
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/${type}/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data.result))
      .catch((err) => console.error(err));
  }, [type, id]);

  if (!item) return <p className="text-center mt-5">Loading...</p>;

  const { properties } = item;

  // URL de imagen del Visual Guide
  const imageUrl = `https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type}/${id}.jpg`;

  return (
    <div className="container mt-5">
      <div className="card mb-5 shadow-lg border-0">
        <div className="row g-0">
          {/* Columna de la imagen */}
          <div className="col-md-5 bg-dark text-center d-flex align-items-center justify-content-center" 
               style={{ minHeight: "400px" }}>
            <img
              src={imageUrl}
              alt={properties.name}
              className="img-fluid rounded-start"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/400x400?text=No+image")
              }
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>

          {/* Columna del contenido */}
          <div className="col-md-7">
            <div className="card-body p-4">
              <h2 className="card-title text-primary mb-3">
                {properties.name}
              </h2>
              <hr />
              <p className="mt-4 text-secondary">
                This character is part of the Star Wars universe, retrieved from SWAPI and enhanced with visuals from the Star Wars Visual Guide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
