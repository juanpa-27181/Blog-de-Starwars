import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalReducer";

const CardItem = ({ type, item }) => {
  const { store, actions } = useGlobalContext();

  // Primero los maps
  const routeMap = { characters: "people", people: "people", planets: "planets", vehicles: "vehicles" };
  const imageMap = { characters: "characters", people: "characters", planets: "planets", vehicles: "vehicles" };

  // Luego definimos las rutas correctas
  const routeType = routeMap[type] ?? type;
  const imageType = imageMap[type] ?? type;

  // Ahora sí la URL (después de definir imageType)
  const imgURL = `https://cdn.jsdelivr.net/gh/breatheco-de/swapi-images@master/assets/img/${imageType}/${item.uid}.jpg`;

  // Manejo de error para evitar recargas infinitas
  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
  };

  const isFavorite = store.favorites.some((f) => f.uid === item.uid);

  const handleFavorite = () => {
    if (isFavorite) {
      actions.removeFavorite(item.uid);
    } else {
      actions.addFavorite({ uid: item.uid, name: item.name, type: routeType });
    }
  };

  return (
    <div className="card m-3 shadow-sm" style={{ width: "18rem", backgroundColor: "white", color: "black", borderRadius: "10px", overflow: "hidden" }}>
      <div style={{ height: "200px", backgroundColor: "#eee", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
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

        {type === "characters" && (
          <>
            <p className="card-text mb-1">Gender: {item.gender || "n/a"}</p>
            <p className="card-text mb-1">Hair Color: {item.hair_color || "n/a"}</p>
            <p className="card-text mb-3">Eye Color: {item.eye_color || "n/a"}</p>
          </>
        )}

        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/${routeType}/${item.uid}`} className="btn btn-outline-primary btn-sm fw-semibold">Learn more!</Link>
          <button className={`btn btn-sm ${isFavorite ? "btn-danger" : "btn-outline-warning"}`} onClick={handleFavorite}>
            <i className="fa fa-heart" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
