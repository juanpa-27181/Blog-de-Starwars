import { Link } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalReducer";

const CardItem = ({ type, item }) => {
  const { store, actions } = useGlobalContext();

  const imageMap = {
    people: "people",
    characters: "people",
    planets: "planets",
    vehicles: "vehicles"
  };

  const routeMap = {
    people: "people",
    characters: "people",
    planets: "planets",
    vehicles: "vehicles"
  };

  const folder = imageMap[type] ?? type;
  const routeType = routeMap[type] ?? type;

  const imgURL = `https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/${folder}/${item.uid}.jpg`;

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/placeholder.jpg";
  };

  const isFavorite = store.favorites.some((f) => f.uid === item.uid);

  const handleFavorite = () => {
    if (isFavorite) actions.removeFavorite(item.uid);
    else actions.addFavorite({ uid: item.uid, name: item.name, type: routeType });
  };

  return (
    <div className="card m-3 shadow-sm" style={{ width: "18rem", borderRadius: "10px" }}>
      <div style={{ height: "200px", background: "#f0f0f0", overflow: "hidden" }}>
        <img
          src={imgURL}
          alt={item.name}
          onError={handleImgError}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="card-body">
        <h5 className="card-title fw-bold">{item.name}</h5>
        <p className="mb-1">Gender: {item.gender || "n/a"}</p>
        <p className="mb-1">Hair Color: {item.hair_color || "n/a"}</p>
        <p className="mb-3">Eye Color: {item.eye_color || "n/a"}</p>

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
