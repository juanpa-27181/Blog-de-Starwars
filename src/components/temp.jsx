import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalReducer";

const CardItem = ({ type, item }) => {
  const { store, actions } = useGlobalContext();

  // Mapeo correcto para carpetas de imágenes de starwars-visualguide
  const imageMap = {
    characters: "characters",
    people: "characters",   // people realmente son characters
    planets: "planets",
    vehicles: "vehicles",
  };

  const routeMap = {
    characters: "people",
    people: "people",
    planets: "planets",
    vehicles: "vehicles",
  };

  const imageType = imageMap[type] ?? type;
  const routeType = routeMap[type] ?? type;

  const imgURL = `https://starwars-visualguide.com/assets/img/${imageType}/${item.uid}.jpg`;

  // Evita parpadeos -> cambia la imagen solo una vez
  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
  };

  // Para favoritos
  const isFavorite = store.favorites.some((f) => f.uid === item.uid);

  const handleFavorite = () => {
    if (isFavorite) {
      actions.removeFavorite(item.uid);
    } else {
      actions.addFavorite({ uid: item.uid, name: item.name, type: routeType });
    }
  };

  // Acceso seguro a propiedades del detalle
  const p = item.properties ?? {};

  return (
    <div className="card m-3 shadow-sm"
      style={{
        width: "18rem",
        backgroundColor: "white",
        color: "black",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {/* Imagen en pantalla */}
      <div
        style={{
          height: "200px",
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={imgURL}
          alt={item.name}
          className="img-fluid"
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
          onError={handleImgError}
        />
      </div>

      <div className="card-body">
        <h5 className="card-title fw-bold">{item.name}</h5>

        {/* Solo mostrar datos existentes*/}
        {routeType === "people" && (
          <>
            <p className="card-text mb-1">Gender: {p.gender || "n/a"}</p>
            <p className="card-text mb-1">Hair Color: {p.hair_color || "n/a"}</p>
            <p className="card-text mb-3">Eye Color: {p.eye_color || "n/a"}</p>
          </>
        )}

        {routeType === "planets" && (
          <>
            <p className="card-text mb-1">Population: {p.population || "n/a"}</p>
            <p className="card-text mb-3">Terrain: {p.terrain || "n/a"}</p>
          </>
        )}

        {routeType === "vehicles" && (
          <>
            <p className="card-text mb-1">Model: {p.model || "n/a"}</p>
            <p className="card-text mb-3">Manufacturer: {p.manufacturer || "n/a"}</p>
          </>
        )}

        {/* Botones */}
        <div className="d-flex justify-content-between align-items-center">
          <Link
            to={`/${routeType}/${item.uid}`}
            className="btn btn-outline-primary btn-sm fw-semibold"
          >
            Learn more!
          </Link>

          <button
            className={`btn btn-sm ${isFavorite ? "btn-danger" : "btn-outline-warning"}`}
            onClick={handleFavorite}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <i className="fa fa-heart" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
