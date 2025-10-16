import { useGlobalContext } from "../hooks/useGlobalReducer";

const Card = ({ title, description }) => {
  const { dispatch } = useGlobalContext();

  const addToFavorites = () => {
    dispatch({ type: "ADD_FAVORITE", payload: title });
  };

  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <div className="card-body text-center">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <button className="btn btn-outline-warning" onClick={addToFavorites}>
          <i className="bi bi-heart"></i> Add Favorite
        </button>
      </div>
    </div>
  );
};

export default Card;
